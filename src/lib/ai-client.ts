import OpenAI from 'openai'
import {
  BedrockRuntimeClient,
  ConverseCommand,
  type Message as BedrockMessage,
} from '@aws-sdk/client-bedrock-runtime'

/** Strip markdown code fences (e.g. ```json ... ```) that some models wrap around JSON output. */
function stripMarkdownCodeFence(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()
}

// ─── JSON repair utilities (exported for use in API routes) ──────────────────

function _extractJsonObject(raw: string): string {
  const start = raw.indexOf('{')
  if (start === -1) return raw
  let depth = 0
  let inString = false
  let escaped = false
  for (let i = start; i < raw.length; i++) {
    const ch = raw[i]
    if (inString) {
      if (!escaped && ch === '"') inString = false
      escaped = !escaped && ch === '\\'
      continue
    }
    if (ch === '"') {
      inString = true
      escaped = false
      continue
    }
    if (ch === '{') depth++
    if (ch === '}') {
      depth--
      if (depth === 0) return raw.slice(start, i + 1)
    }
  }
  return raw
}

function _escapeUnescapedControlChars(raw: string): string {
  let result = ''
  let inString = false
  let escaped = false
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i]
    if (inString) {
      if (!escaped && ch === '"') {
        inString = false
        result += ch
        continue
      }
      if (!escaped && (ch === '\n' || ch === '\r')) {
        result += '\\n'
        continue
      }
      if (!escaped && ch === '\t') {
        result += '\\t'
        continue
      }
      escaped = ch === '\\' && !escaped
      result += ch
      continue
    }
    if (ch === '"') {
      inString = true
      escaped = false
    }
    result += ch
  }
  return result
}

function _stripJsonComments(raw: string): string {
  let result = ''
  let inString = false
  let escaped = false
  let i = 0
  while (i < raw.length) {
    const ch = raw[i]
    if (inString) {
      if (!escaped && ch === '"') inString = false
      escaped = !escaped && ch === '\\'
      result += ch
      i++
      continue
    }
    if (ch === '/' && raw[i + 1] === '/') {
      while (i < raw.length && raw[i] !== '\n') i++
      continue
    }
    if (ch === '/' && raw[i + 1] === '*') {
      i += 2
      while (i < raw.length - 1 && !(raw[i] === '*' && raw[i + 1] === '/')) i++
      i += 2
      continue
    }
    if (ch === '"') inString = true
    result += ch
    i++
  }
  return result
}

/**
 * Repair a potentially malformed JSON string from AI output:
 * - Extracts the outermost {...} object
 * - Strips JS-style comments
 * - Escapes raw newlines/tabs inside string values
 * - Removes trailing commas
 */
export function repairJson(raw: string): string {
  const trimmed = _extractJsonObject(raw.trim())
  const noComments = _stripJsonComments(trimmed)
  const escaped = _escapeUnescapedControlChars(noComments)
  return escaped.replace(/,\s*([}\]])/g, '$1')
}

export const AI_PROVIDER = process.env.AI_PROVIDER === 'bedrock' ? 'bedrock' : 'nvidia'

const DEFAULT_NVIDIA_MODEL = 'qwen/qwen3.5-122b-a10b'
export const NVIDIA_MODEL = process.env.NVIDIA_MODEL ?? DEFAULT_NVIDIA_MODEL
export const AI_MODEL =
  AI_PROVIDER === 'bedrock' ? (process.env.ANTHROPIC_MODEL ?? '') : NVIDIA_MODEL

type Message = { role: 'system' | 'user' | 'assistant'; content: string }

let _bedrockClient: BedrockRuntimeClient | null = null
function getBedrockClient(): BedrockRuntimeClient {
  if (_bedrockClient) return _bedrockClient
  const accessKeyId = process.env.BEDROCK_AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.BEDROCK_AWS_SECRET_ACCESS_KEY
  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'Bedrock IAM credentials missing: set BEDROCK_AWS_ACCESS_KEY_ID and BEDROCK_AWS_SECRET_ACCESS_KEY'
    )
  }
  _bedrockClient = new BedrockRuntimeClient({
    region: process.env.BEDROCK_AWS_REGION ?? 'ap-southeast-1',
    credentials: { accessKeyId, secretAccessKey },
  })
  return _bedrockClient
}

async function invokeBedrockConverse(messages: Message[], maxTokens: number): Promise<string> {
  const modelId = process.env.ANTHROPIC_MODEL
  if (!modelId) throw new Error('ANTHROPIC_MODEL env var is required for Bedrock')

  const systemMessages = messages.filter((m) => m.role === 'system')
  const chatMessages = messages.filter((m) => m.role !== 'system')

  const command = new ConverseCommand({
    modelId,
    system: systemMessages.map((m) => ({ text: m.content })),
    messages: chatMessages.map<BedrockMessage>((m) => ({
      role: m.role as 'user' | 'assistant',
      content: [{ text: m.content }],
    })),
    inferenceConfig: { maxTokens },
  })

  const response = await getBedrockClient().send(command)
  const text = response.output?.message?.content?.[0]?.text
  if (!text) throw new Error('Bedrock returned empty response')
  return stripMarkdownCodeFence(text)
}

/**
 * 统一文本生成接口，返回 AI 响应的文本内容（JSON 字符串）。
 * Bedrock: 使用 IAM 凭证 + SigV4 签名调用 Converse API。
 * NVIDIA: 使用 OpenAI SDK 调用 NVIDIA 兼容 API。
 */
export async function generateJSON(
  messages: Message[],
  options: { maxTokens?: number } = {}
): Promise<string> {
  const maxTokens = options.maxTokens ?? 2500

  if (AI_PROVIDER === 'bedrock') {
    return invokeBedrockConverse(messages, maxTokens)
  }

  // NVIDIA (OpenAI-compatible)
  const openai = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  })
  const completion = await openai.chat.completions.create({
    model: NVIDIA_MODEL,
    messages,
    response_format: { type: 'json_object' },
    max_tokens: maxTokens,
  })
  return completion.choices[0].message.content ?? ''
}

/**
 * Plain-text generation (no JSON response_format).
 * Use this when JSON wrappers are causing parse failures.
 */
export async function generateText(
  messages: Message[],
  options: { maxTokens?: number } = {}
): Promise<string> {
  const maxTokens = options.maxTokens ?? 2500

  if (AI_PROVIDER === 'bedrock') {
    return invokeBedrockConverse(messages, maxTokens)
  }

  // NVIDIA (OpenAI-compatible)
  const openai = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  })
  const completion = await openai.chat.completions.create({
    model: NVIDIA_MODEL,
    messages,
    max_tokens: maxTokens,
  })
  return completion.choices[0].message.content ?? ''
}

/** @deprecated 使用 generateJSON() 代替 */
export function createAIClient() {
  return new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  })
}

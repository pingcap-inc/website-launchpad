import OpenAI from 'openai'

/** Strip markdown code fences (e.g. ```json ... ```) that some models wrap around JSON output. */
function stripMarkdownCodeFence(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()
}

export const AI_PROVIDER = process.env.AI_PROVIDER === 'bedrock' ? 'bedrock' : 'nvidia'

const NVIDIA_MODEL = 'qwen/qwen3.5-122b-a10b'
export const AI_MODEL =
  AI_PROVIDER === 'bedrock' ? (process.env.ANTHROPIC_MODEL ?? '') : NVIDIA_MODEL

type Message = { role: 'system' | 'user' | 'assistant'; content: string }

/**
 * 统一文本生成接口，返回 AI 响应的文本内容（JSON 字符串）。
 * Bedrock: 使用 Bedrock API Key 直接调用 Converse REST API，无需 AWS 凭证。
 * NVIDIA: 使用 OpenAI SDK 调用 NVIDIA 兼容 API。
 */
export async function generateJSON(
  messages: Message[],
  options: { maxTokens?: number } = {}
): Promise<string> {
  const maxTokens = options.maxTokens ?? 2500

  if (AI_PROVIDER === 'bedrock') {
    const region = process.env.AWS_REGION ?? 'us-east-1'
    const modelId = process.env.ANTHROPIC_MODEL!
    const endpoint = `https://bedrock-runtime.${region}.amazonaws.com/model/${encodeURIComponent(modelId)}/converse`

    const systemMessages = messages.filter((m) => m.role === 'system')
    const chatMessages = messages.filter((m) => m.role !== 'system')

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AWS_BEARER_TOKEN_BEDROCK}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system: systemMessages.map((m) => ({ text: m.content })),
        messages: chatMessages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: [{ text: m.content }],
        })),
        inferenceConfig: { maxTokens },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Bedrock API error ${res.status}: ${err}`)
    }

    const data = await res.json()
    const text = data.output?.message?.content?.[0]?.text
    if (!text) throw new Error('Bedrock returned empty response')
    return stripMarkdownCodeFence(text)
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

/** @deprecated 使用 generateJSON() 代替 */
export function createAIClient() {
  return new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  })
}

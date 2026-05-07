const SAFE_ESCAPED_PUNCTUATION = /\\([!"$%&'()+,\-./:;<=>?@^{|}~])/g
const FENCED_CODE_BLOCK = /^(```|~~~)/
const INLINE_CODE_SPAN = /(`+[^`]*`+)/g

function cleanupEscapesOutsideCode(line: string): string {
  return line
    .split(INLINE_CODE_SPAN)
    .map((segment, index) =>
      index % 2 === 1 ? segment : segment.replace(SAFE_ESCAPED_PUNCTUATION, '$1')
    )
    .join('')
}

export function cleanupImportedMarkdownEscapes(text: string): string {
  let inCodeFence = false

  return text
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trimStart()
      if (FENCED_CODE_BLOCK.test(trimmed)) {
        inCodeFence = !inCodeFence
        return line
      }

      if (inCodeFence) return line
      return cleanupEscapesOutsideCode(line)
    })
    .join('\n')
}

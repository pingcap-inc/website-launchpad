/**
 * SVG sniffing for the upload route (dependency-free, so it can be exercised in
 * isolation).
 *
 * SVG has no magic number: accept only text that is plainly an SVG document — an
 * optional BOM, an optional XML declaration, then any mix of comments and at most
 * one `<!doctype svg …>`, then a root `<svg` element — with no NUL byte.
 *
 * Implemented as a linear scan rather than a regular expression: the previous
 * pattern `(<!--[\s\S]*?-->\s*)*(<!doctype…)?(<!--[\s\S]*?-->\s*)*<svg` had two
 * adjacent repeated groups that could each match the same comments, so a ~200-byte
 * upload of repeated `<!---->` followed by a non-SVG byte backtracked exponentially
 * and hung the request. Every step here moves the cursor forward, so the cost is
 * O(n) in the (4 KB-capped) head.
 */

const SVG_SNIFF_BYTES = 4096

function isXmlSpace(code: number) {
  // XML whitespace plus the other ASCII/Unicode blanks `\s` used to accept.
  return (
    code === 0x20 ||
    code === 0x09 ||
    code === 0x0a ||
    code === 0x0d ||
    code === 0x0b ||
    code === 0x0c ||
    code === 0xa0 ||
    code === 0xfeff
  )
}

export function looksLikeSvgText(text: string): boolean {
  let s = text.slice(0, SVG_SNIFF_BYTES)
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1)
  let i = 0
  const skipSpace = () => {
    while (i < s.length && isXmlSpace(s.charCodeAt(i))) i++
  }
  const startsAtI = (prefix: string) =>
    s.slice(i, i + prefix.length).toLowerCase() === prefix.toLowerCase()

  skipSpace()
  // Optional XML declaration: `<?xml … ?>` with no `>` before the closing `?>`.
  if (startsAtI('<?xml')) {
    const end = s.indexOf('?>', i + 5)
    if (end === -1 || s.slice(i, end).includes('>')) return false
    i = end + 2
    skipSpace()
  }

  let sawDoctype = false
  for (;;) {
    if (startsAtI('<!--')) {
      const end = s.indexOf('-->', i + 4)
      if (end === -1) return false
      i = end + 3
      skipSpace()
      continue
    }
    if (!sawDoctype && startsAtI('<!doctype')) {
      // `<!doctype` + whitespace + `svg`, then anything up to the first `>`.
      let j = i + '<!doctype'.length
      if (j >= s.length || !isXmlSpace(s.charCodeAt(j))) return false
      while (j < s.length && isXmlSpace(s.charCodeAt(j))) j++
      if (s.slice(j, j + 3).toLowerCase() !== 'svg') return false
      const end = s.indexOf('>', j)
      if (end === -1) return false
      i = end + 1
      sawDoctype = true
      skipSpace()
      continue
    }
    break
  }

  if (!startsAtI('<svg')) return false
  const next = s.charCodeAt(i + 4)
  return next === 0x3e /* > */ || isXmlSpace(next)
}

export function looksLikeSvg(buffer: Buffer): boolean {
  if (buffer.includes(0)) return false
  return looksLikeSvgText(buffer.toString('utf-8', 0, Math.min(buffer.length, SVG_SNIFF_BYTES)))
}

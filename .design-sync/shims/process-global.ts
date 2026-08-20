// Installs a minimal `process` before any component module evaluates.
//
// Next.js internals and prismjs read `process.env.*` / `process.platform` at
// module-init time. In a plain browser bundle that throws "process is not
// defined" before a single export is assigned, which blanks the entire design
// system. ds-entry.ts imports this first so ES module evaluation order puts it
// ahead of the component tree.
declare global {
  // eslint-disable-next-line no-var
  var process: { env: Record<string, string | undefined>; platform: string }
}

globalThis.process ||= { env: {}, platform: 'browser' }
globalThis.process.env ||= {}

export {}

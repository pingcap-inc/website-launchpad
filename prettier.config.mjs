// Single source of truth for Prettier options.
//
// This is a .mjs module rather than a .prettierrc JSON file so that the admin
// publish route can `import` it directly (see src/app/api/publish/route.ts).
// That route formats generated page.tsx/page.dsl.json server-side, and it runs
// where `prettier.resolveConfig()` cannot find a config file on disk — importing
// these options keeps admin-published output byte-identical to local
// `prettier --write`. The Prettier CLI and editors auto-discover this file, so
// renaming it or moving the options back into JSON silently re-splits the two.
/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  semi: false,
  printWidth: 100,
  trailingComma: 'es5',
  tabWidth: 2,
  arrowParens: 'always',
}

export default config

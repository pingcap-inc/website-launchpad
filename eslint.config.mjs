import nextConfig from 'eslint-config-next'

export default [
  ...nextConfig,
  {
    ignores: ['.next/', 'node_modules/'],
  },
  {
    // Disable overly strict react-hooks v5 rules that produce false positives
    // on common patterns (e.g. setState at start of effect, window.location nav)
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
    },
  },
]

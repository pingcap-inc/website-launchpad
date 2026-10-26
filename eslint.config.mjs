import nextConfig from 'eslint-config-next'

export default [
  ...nextConfig,
  {
    // latam-animations-source holds Remotion sources for the LATAM page videos.
    // Remotion is not a dependency of this app (the clips are pre-rendered to
    // public/videos), so these files are excluded from tsc and eslint.
    ignores: ['.next/', 'node_modules/', 'latam-animations-source/'],
  },
  {
    // Disable overly strict react-hooks v5 rules that produce false positives
    // on common patterns (e.g. setState at start of effect, window.location nav)
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      // eslint-plugin-react-hooks 7.1 (pulled in by eslint-config-next 16.4)
      // tightened these; existing /admin editor code reads refs during render.
      // TODO: refactor src/app/admin/(shell)/create and re-enable.
      'react-hooks/refs': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },
]

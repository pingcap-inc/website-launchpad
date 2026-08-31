# LATAM animation sources

[Remotion](https://www.remotion.dev/) components used to render the looping
clips on `/latam/`. Kept here so the animations can be tweaked and
re-rendered later.

These are **source files only** — they are not imported by the app. Each one is
pre-rendered to an MP4 in `public/videos/`, and the page plays those:

| Source                   | Rendered output                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `TripleBarGrowth.tsx`    | `public/videos/triple-bar-growth.mp4`                                                                    |
| `DeployScale.tsx`        | `public/videos/deploy-scale.mp4`                                                                         |
| `CompatibleLine.tsx`     | `public/videos/compatible-line.mp4`                                                                      |
| `EnterpriseSecurity.tsx` | `public/videos/enterprise-security.mp4`                                                                  |
| `TargetPulse.tsx`        | `public/videos/target-pulse.mp4`                                                                         |
| `LatamNetwork.tsx`       | _no longer used_ — the hero now uses a static map (`public/images/latam-map-red.svg`) plus CSS animation |

## Why this folder is excluded from the build

`remotion` is **not** a dependency of this app — the clips ship as plain MP4s,
so shipping Remotion to production would be dead weight. But these files
`import { ... } from 'remotion'`, which would make `pnpm type-check`, `pnpm lint`,
and `pnpm build` fail with `Cannot find module 'remotion'`.

So the folder is excluded in two places:

- `tsconfig.json` → `exclude: ["node_modules", "latam-animations-source"]`
- `eslint.config.mjs` → `ignores: [..., 'latam-animations-source/']`

**Do not remove those entries** while this folder is in the repo, or the build
will break.

## Re-rendering a clip

Remotion isn't installed here, so render from a scratch project outside this repo:

```bash
# somewhere outside this repo
npm create video@latest my-render -- --blank
cd my-render
# copy the component in, register it as a <Composition> in src/Root.tsx, then:
npx remotion render <composition-id> out.mp4
```

Then copy the resulting MP4 into `public/videos/` under the matching filename above.

The card clips render at a 188×86 canvas (4× scale → 752×344).

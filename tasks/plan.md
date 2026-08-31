# Fix PrismBackground WebGL Errors

## Plan

- [x] Reproduce the reported `COMPILE_STATUS = false` / `null` info-log symptom with a minimal WebGL context-loss harness.
- [x] Add a regression test for effect cleanup that releases owned GPU resources without intentionally losing the canvas context.
- [x] Replace destructive context teardown with explicit shader, program, and buffer disposal; keep the existing static-poster fallback for genuine WebGL failures.
- [x] Verify the focused regression test, type checking, linting, production build, and the original local-page console check.

## Results / Review

The component cleanup intentionally called `WEBGL_lose_context`. During a
development effect restart (for example HMR), the same canvas could be reused
with that lost context. Chrome then returns a falsey shader compile status and
a `null` shader info log, matching the reported overlay exactly.

The cleanup now deletes only the buffer, program, and shaders it owns. Shader
and link failures caused by a genuinely lost context silently select the
existing poster fallback; real shader errors remain visible to developers.

Verification:

- Focused regression test: passed (1/1).
- `pnpm type-check`: passed.
- Focused ESLint: passed.
- `pnpm lint`: passed with 11 pre-existing warnings outside this change.
- `pnpm build`: passed; all 73 static pages generated.
- Chrome Metal console check of `/tidb-cloud-filesystem/`: no
  `PrismBackground` shader or link errors.

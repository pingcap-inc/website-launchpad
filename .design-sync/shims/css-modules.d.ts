// Next.js supplies these types via next-env.d.ts, which the declaration-emit
// tsconfig does not include. Without it, HubSpotForm.tsx fails to resolve its
// .module.css import and emits no declarations.
declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

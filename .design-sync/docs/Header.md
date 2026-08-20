---
category: UI
---

## Component spec

```tsx
// components/ui/Header.tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary h-[62px] lg:h-20 px-4 md:px-8 lg:px-16 flex items-center justify-between">
  {/* Logo: 92×38 mobile / 120×50 desktop, do not replace */}
  <a href="https://www.pingcap.com/tidb/" className="shrink-0">
    <Image
      src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
      alt="TiDB"
      width={120}
      height={50}
      className="block w-[92px] h-[38px] lg:w-[120px] lg:h-[50px]"
    />
  </a>

  {/* Desktop menu: hover-triggered mega-menu dropdowns */}
  <ul className="hidden lg:flex items-center gap-1 text-base font-medium text-text-inverse">
    <li>Product</li>
    <li>Solutions</li>
    <li>Resources</li>
    <li>Company</li>
    <li>
      <a href="https://docs.pingcap.com/">Docs</a>
    </li>
  </ul>

  {/* Desktop CTAs */}
  <div className="hidden lg:flex items-center gap-4 shrink-0">
    <GhostButton href="https://tidbcloud.com/signin">Sign In</GhostButton>
    <PrimaryButton href="https://tidbcloud.com/free-trial/">Start for Free</PrimaryButton>
  </div>

  {/* Mobile: hamburger → accordion menu */}
</nav>
```

**Implementation details (current):**

- `Header.tsx` keeps a lightweight shell (logo / top-level nav labels / CTA / mobile toggle).
- `HeaderMenus.tsx` contains mega-menu + mobile accordion content and is loaded with `next/dynamic`.
- Desktop dropdown content renders only when hovered/focused (`openDropdown === item.label`), not pre-rendered.
- Mobile menu mounts only when opened (`mobileOpen`).
- Header dropdown icons are imported from `header-icons.tsx` (subset), avoiding full `pingcap-icons.tsx` in initial Header path.

**Dropdown icons** in Header use this subset:

- Product: `CloudTIcon`, `StackTIcon`, `DollarTIcon`, `GearIcon`, `SlidersIcon`, `StarIcon`, `EyeIcon`
- Solutions: `ChartDownTIcon`, `StarIcon`, `CloudTIcon`, `AiTIcon`, `WalletTIcon`, `BagT1Icon`, `DesktopTIcon`
- Resources: `FileTIcon`, `BookTIcon`, `VideoIcon`, `ScaleTIcon`, `CalendarTIcon`, `CommentsTIcon`, `CodeTIcon`, `BookmarkTIcon`, `EducationIcon`, `AppWindowIcon`, `AwardIcon`
- Company: `NewspaperIcon`, `BuildingsIcon`, `BriefcaseIcon`, `HandshakeIcon`, `AtIcon`

Rules: `h-[62px] lg:h-20` · `px-4 md:px-8 lg:px-16` · pure black background · add `pt-[62px] lg:pt-20` to page content wrapper.

---

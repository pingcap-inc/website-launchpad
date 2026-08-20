---
category: UI
---

## Section usage

`SectionWrapper` lives in `src/components/ui/SectionWrapper.tsx` and should wrap every section instance.

### Props

| Prop               | Type                   | Default     | Notes                                              |
| ------------------ | ---------------------- | ----------- | -------------------------------------------------- |
| `id`               | `string`               | `undefined` | Anchor id for in-page navigation.                  |
| `style`            | `SectionStyle`         | `undefined` | Background, spacing, and background image options. |
| `defaultStyle`     | `SectionStyle`         | `undefined` | Section defaults used when `style` omits fields.   |
| `contentWidth`     | `'sm' \| 'md' \| 'lg'` | `lg`        | `sm=905px`, `md=1140px`, `lg=1374px`.              |
| `contentClassName` | `string`               | `undefined` | Extra class on the inner content wrapper.          |
| `children`         | `ReactNode`            | required    | Section content.                                   |

### SectionStyle

| Field                             | Type                                                                                                                                                 | Notes                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `background`                      | `'primary' \| 'inverse' \| 'gradient-dark-top' \| 'gradient-dark-bottom' \| 'brand-red' \| 'brand-violet' \| 'brand-blue' \| 'brand-teal' \| 'none'` | Background token.                            |
| `spacing`                         | `'none' \| 'sm' \| 'md' \| 'lg' \| 'section' \| 'hero'`                                                                                              | Vertical padding preset.                     |
| `removePaddingTop`                | `boolean`                                                                                                                                            | When `true`, applies `pt-0` (and `lg:pt-0`). |
| `removePaddingBottom`             | `boolean`                                                                                                                                            | When `true`, applies `pb-0` (and `lg:pb-0`). |
| `className`                       | `string`                                                                                                                                             | Extra classes on the section root.           |
| `backgroundImage`                 | `{ image: ImageRef }`                                                                                                                                | Optional background image.                   |
| `backgroundImageOpacityClassName` | `string`                                                                                                                                             | Tailwind opacity class for background image. |
| `backgroundImageOverlayClassName` | `string`                                                                                                                                             | Optional overlay class.                      |

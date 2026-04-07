# Sections Components

This document summarizes section-level components under `src/components/sections/` and how to use them. These components are meant to be wrapped by `SectionWrapper` so spacing, background, tone, and width stay consistent.

## SectionWrapper (recommended for all sections)

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

## Components

### HeroSection

File: `src/components/sections/HeroSection.tsx`

Layouts: `centered`, `split`, `image-right` (default).

Props:

| Prop              | Type                                                                                  | Notes                                                                        |
| ----------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `layout`          | `'centered' \| 'split' \| 'image-right'`                                              | Layout variant.                                                              |
| `eyebrow`         | `string`                                                                              | Optional eyebrow.                                                            |
| `headline`        | `string \| ReactNode`                                                                 | HTML strings are rendered via `dangerouslySetInnerHTML` and must be trusted. |
| `subheadline`     | `string`                                                                              | Optional subheadline.                                                        |
| `primaryCta`      | `{ text: string; href: string }`                                                      | Optional primary CTA.                                                        |
| `secondaryCta`    | `{ text: string; href: string }`                                                      | Optional secondary CTA.                                                      |
| `rightSlot`       | `ReactNode`                                                                           | Used only in `split` layout.                                                 |
| `heroImage`       | `{ image: ImageRef; alt?; width?; height?; align?; priority? }`                       | Used only in `image-right` layout.                                           |
| `backgroundImage` | `{ image: ImageRef; alt?; opacityClassName?; overlayClassName?; positionClassName? }` | Used only in `centered` layout.                                              |
| `className`       | `string`                                                                              | Root class.                                                                  |

### FeatureGridSection

File: `src/components/sections/FeatureGridSection.tsx`

Props:

| Prop         | Type                             | Notes                      |
| ------------ | -------------------------------- | -------------------------- |
| `eyebrow`    | `string`                         | Optional eyebrow.          |
| `title`      | `string`                         | Required.                  |
| `subtitle`   | `string`                         | Optional subtitle.         |
| `features`   | `Feature[]`                      | Feature items list.        |
| `columns`    | `2 \| 3 \| 4`                    | Grid columns. Default `3`. |
| `viewMore`   | `{ text: string; href: string }` | Optional CTA below grid.   |
| `itemLayout` | `'horizontal' \| 'vertical'`     | Default layout for items.  |
| `className`  | `string`                         | Root class.                |

Feature item:

| Field         | Type                             | Notes                              |
| ------------- | -------------------------------- | ---------------------------------- |
| `icon`        | `ReactNode`                      | Optional icon.                     |
| `title`       | `string`                         | Required.                          |
| `description` | `string`                         | Required.                          |
| `cta`         | `{ text: string; href: string }` | Optional per-item CTA.             |
| `layout`      | `'horizontal' \| 'vertical'`     | Optional per-item layout override. |

### FeatureTabsSection

File: `src/components/sections/FeatureTabsSection.tsx` (client component)

Props:

| Prop                 | Type               | Notes              |
| -------------------- | ------------------ | ------------------ |
| `eyebrow`            | `string`           | Optional eyebrow.  |
| `title`              | `string`           | Required.          |
| `subtitle`           | `string`           | Optional subtitle. |
| `tabs`               | `FeatureTabItem[]` | Tab list.          |
| `autoSwitch`         | `boolean`          | Default `true`.    |
| `autoSwitchInterval` | `number`           | Default `6000` ms. |
| `className`          | `string`           | Root class.        |

Tab item:

| Field          | Type                                         | Notes                                                             |
| -------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| `id`           | `string`                                     | Unique id.                                                        |
| `label`        | `string`                                     | Tab label.                                                        |
| `description`  | `string`                                     | Optional description.                                             |
| `bullets`      | `string[]`                                   | Optional bullet list.                                             |
| `primaryCta`   | `{ text: string; href: string }`             | Optional primary CTA.                                             |
| `secondaryCta` | `{ text: string; href: string }`             | Optional secondary CTA.                                           |
| `content`      | `ReactNode`                                  | Optional custom left content. Overrides description/bullets/ctas. |
| `image`        | `{ image: ImageRef; alt?; width?; height? }` | Required image.                                                   |

### FeatureCardSection

File: `src/components/sections/FeatureCardSection.tsx`

Props:

| Prop          | Type                | Notes                      |
| ------------- | ------------------- | -------------------------- |
| `eyebrow`     | `string`            | Optional eyebrow.          |
| `title`       | `string`            | Required.                  |
| `subtitle`    | `string`            | Optional subtitle.         |
| `items`       | `FeatureCardItem[]` | Card items.                |
| `columns`     | `2 \| 3 \| 4`       | Grid columns. Default `2`. |
| `borderStyle` | `'gray' \| 'color'` | Default `gray`.            |
| `className`   | `string`            | Root class.                |

Card item:

| Field         | Type        | Notes                                    |
| ------------- | ----------- | ---------------------------------------- |
| `icon`        | `ReactNode` | Optional icon.                           |
| `title`       | `string`    | Required.                                |
| `description` | `string`    | Required.                                |
| `borderColor` | `string`    | Optional tailwind border class override. |
| `href`        | `string`    | Optional link.                           |
| `className`   | `string`    | Optional per-card class.                 |

### FeatureHighlightsSection

File: `src/components/sections/FeatureHighlightsSection.tsx`

Props:

| Prop        | Type                             | Notes                      |
| ----------- | -------------------------------- | -------------------------- |
| `eyebrow`   | `string`                         | Optional eyebrow.          |
| `title`     | `string`                         | Required.                  |
| `subtitle`  | `string`                         | Optional subtitle.         |
| `items`     | `ColorCardItem[]`                | Color cards.               |
| `columns`   | `2 \| 3 \| 4`                    | Grid columns. Default `3`. |
| `viewMore`  | `{ text: string; href: string }` | Optional CTA below grid.   |
| `className` | `string`                         | Root class.                |

Color card item:

| Field         | Type                                    | Notes                    |
| ------------- | --------------------------------------- | ------------------------ |
| `variant`     | `'red' \| 'violet' \| 'blue' \| 'teal'` | Card background variant. |
| `title`       | `string`                                | Required.                |
| `description` | `string`                                | Required.                |
| `cta`         | `{ text: string; href: string }`        | Required CTA.            |
| `icon`        | `ReactNode`                             | Optional icon.           |

### LogoCloudSection

File: `src/components/sections/LogoCloudSection.tsx`

Props:

| Prop                    | Type                     | Notes                                                 |
| ----------------------- | ------------------------ | ----------------------------------------------------- |
| `eyebrow`               | `string`                 | Optional eyebrow.                                     |
| `title`                 | `string`                 | Optional title.                                       |
| `subtitle`              | `string`                 | Optional subtitle.                                    |
| `logos`                 | `LogoCloudItem[]`        | Logo items.                                           |
| `variant`               | `'default' \| 'minimal'` | Image size/opacity style.                             |
| `align`                 | `'center' \| 'left'`     | Header + content alignment.                           |
| `autoScroll`            | `boolean`                | Default `true`. Only scrolls when `logos.length > 4`. |
| `scrollSpeedSeconds`    | `number`                 | Default `28`.                                         |
| `scrollContentMaxWidth` | `number`                 | Optional max width for the scroll container (px).     |
| `className`             | `string`                 | Root class.                                           |

Logo item:

| Field    | Type       | Notes                  |
| -------- | ---------- | ---------------------- |
| `name`   | `string`   | Used for alt and keys. |
| `image`  | `ImageRef` | Required.              |
| `href`   | `string`   | Optional link.         |
| `width`  | `number`   | Optional image width.  |
| `height` | `number`   | Optional image height. |

### StatsSection

File: `src/components/sections/StatsSection.tsx` (client component)

Props:

| Prop        | Type          | Notes                      |
| ----------- | ------------- | -------------------------- |
| `eyebrow`   | `string`      | Optional eyebrow.          |
| `title`     | `string`      | Optional title.            |
| `subtitle`  | `string`      | Optional subtitle.         |
| `stats`     | `StatItem[]`  | Stat cards.                |
| `columns`   | `2 \| 3 \| 4` | Grid columns. Default `3`. |
| `className` | `string`      | Root class.                |

Stat item:

| Field         | Type        | Notes                 |
| ------------- | ----------- | --------------------- |
| `icon`        | `ReactNode` | Optional icon.        |
| `value`       | `string`    | CountUp value.        |
| `label`       | `string`    | Required label.       |
| `description` | `string`    | Optional description. |

### TestimonialsSection

File: `src/components/sections/TestimonialsSection.tsx` (client component)

Props:

| Prop           | Type                | Notes             |
| -------------- | ------------------- | ----------------- |
| `eyebrow`      | `string`            | Optional eyebrow. |
| `title`        | `string`            | Required.         |
| `testimonials` | `TestimonialCard[]` | Card list.        |
| `className`    | `string`            | Root class.       |

Testimonial item:

| Field    | Type                               | Notes                |
| -------- | ---------------------------------- | -------------------- |
| `quote`  | `string`                           | Required.            |
| `author` | `string`                           | Required.            |
| `href`   | `string`                           | Optional link.       |
| `cta`    | `string`                           | Optional CTA label.  |
| `logo`   | `{ image: ImageRef; alt?; size? }` | Optional logo badge. |

### FaqSection

File: `src/components/sections/FaqSection.tsx`

Props:

| Prop        | Type        | Notes           |
| ----------- | ----------- | --------------- |
| `title`     | `string`    | Optional title. |
| `items`     | `FaqItem[]` | Q&A list.       |
| `className` | `string`    | Root class.     |

Faq item:

| Field | Type     | Notes     |
| ----- | -------- | --------- |
| `q`   | `string` | Question. |
| `a`   | `string` | Answer.   |

### CtaSection

File: `src/components/sections/CtaSection.tsx`

Props:

| Prop           | Type                                         | Notes              |
| -------------- | -------------------------------------------- | ------------------ |
| `title`        | `string`                                     | Required.          |
| `subtitle`     | `string`                                     | Optional subtitle. |
| `image`        | `{ image: ImageRef; alt?; width?; height? }` | Optional image.    |
| `primaryCta`   | `{ text: string; href: string }`             | Required.          |
| `secondaryCta` | `{ text: string; href: string }`             | Optional.          |
| `className`    | `string`                                     | Root class.        |

### FormSection

File: `src/components/sections/FormSection.tsx`

Props:

| Prop        | Type     | Notes              |
| ----------- | -------- | ------------------ |
| `title`     | `string` | Optional title.    |
| `subtitle`  | `string` | Optional subtitle. |
| `portalId`  | `string` | HubSpot portal id. |
| `formId`    | `string` | HubSpot form id.   |
| `region`    | `string` | HubSpot region.    |
| `className` | `string` | Root class.        |

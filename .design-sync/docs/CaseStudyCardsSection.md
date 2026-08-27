---
category: Sections
---

## Section usage

File: `src/components/sections/CaseStudyCardsSection.tsx`

Props:

| Prop        | Type                  | Notes             |
| ----------- | --------------------- | ----------------- |
| `eyebrow`   | `string`              | Optional eyebrow. |
| `title`     | `string`              | Required.         |
| `items`     | `CaseStudyCardItem[]` | Card list.        |
| `className` | `string`              | Root class.       |

Card item:

| Field         | Type                               | Notes                 |
| ------------- | ---------------------------------- | --------------------- |
| `badge`       | `string`                           | Optional top badge.   |
| `logo`        | `{ image, alt?, width?, height? }` | Required logo upload. |
| `title`       | `string`                           | Required.             |
| `description` | `string`                           | Required.             |
| `stats`       | `CaseStudyCardStat[]`              | One or more stats.    |
| `href`        | `string`                           | Optional link.        |
| `cta`         | `string`                           | Optional CTA label.   |

Card stat:

| Field   | Type     | Notes     |
| ------- | -------- | --------- |
| `value` | `string` | Required. |
| `label` | `string` | Required. |

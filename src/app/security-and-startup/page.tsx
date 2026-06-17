import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB 阿里云安全白皮书与初创企业计划 | PingCAP",
  description: "探索 TiDB 在阿里云上的安全架构与合规性，并了解 TiDB Cloud 初创企业支持计划。立即下载白皮书并申请初创企业权益。",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/security-and-startup/' },
  openGraph: {
    title: "TiDB 阿里云安全白皮书与初创企业计划 | PingCAP",
    description: "探索 TiDB 在阿里云上的安全架构与合规性，并了解 TiDB Cloud 初创企业支持计划。立即下载白皮书并申请初创企业权益。",
    url: 'https://www.pingcap.com/security-and-startup/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
}

const schema = buildPageSchema({
  path: "/security-and-startup/",
  title: "TiDB 阿里云安全白皮书与初创企业计划 | PingCAP",
  description: "探索 TiDB 在阿里云上的安全架构与合规性，并了解 TiDB Cloud 初创企业支持计划。立即下载白皮书并申请初创企业权益。",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "TiDB 阿里云<span class=\"text-gradient-violet\">安全白皮书</span>与初创企业计划", path: "/security-and-startup/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB 阿里云安全白皮书与初创企业计划 | PingCAP",
  "meta": {
    "title": "TiDB 阿里云安全白皮书与初创企业计划 | PingCAP",
    "description": "探索 TiDB 在阿里云上的安全架构与合规性，并了解 TiDB Cloud 初创企业支持计划。立即下载白皮书并申请初创企业权益。",
    "canonical": "/security-and-startup/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "split",
        "eyebrow": "安全与增长",
        "headline": "TiDB 阿里云<span class=\"text-gradient-violet\">安全白皮书</span>与初创企业计划",
        "subheadline": "获取企业级云数据库安全指南，并加入 TiDB Cloud 初创企业扶持计划，加速您的业务创新。",
        "primaryCta": {
          "text": "下载白皮书",
          "href": "#whitepaper-form"
        },
        "secondaryCta": {
          "text": "申请初创计划",
          "href": "#startup-form"
        },
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/f54533cc-1000011158.svg"
          },
          "alt": "hero image",
          "width": 500,
          "height": 400
        }
      },
      "style": {
        "spacing": "hero"
      }
    },
    {
      "id": "whitepaper-section",
      "type": "featureMedia",
      "props": {
        "eyebrow": "安全合规",
        "title": "TiDB on Alibaba Cloud 安全白皮书",
        "subtitle": "深入解析 TiDB 在阿里云环境下的数据加密、访问控制、合规认证及最佳安全实践。",
        "items": [
          {
            "title": "企业级安全架构",
            "description": "白皮书详细阐述了 TiDB 在阿里云上的多层防御体系，涵盖网络隔离、数据静态与传输加密、密钥管理以及审计日志等核心安全能力，助力企业满足等保及行业合规要求。",
            "image": {
              "image": {
                "url": ""
              }
            },
            "imagePosition": "right"
          }
        ],
        "startPosition": "left"
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "whitepaper-form",
      "type": "form",
      "props": {
        "title": "立即下载安全白皮书",
        "subtitle": "填写表单以获取 PDF 版本，我们的安全专家将为您提供详细解读。",
        "portalId": "4466002",
        "formId": "8d439c40-4e6b-4192-a99b-a2c619ad4146",
        "region": "na1"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "startup-section",
      "type": "featureCard",
      "props": {
        "eyebrow": "成长加速",
        "title": "TiDB Cloud Startup Program",
        "subtitle": "专为高潜力初创企业设计，提供技术资源、云 credits 及专家指导，助力您从零到一构建可扩展的数据基础设施。",
        "items": [
          {
            "icon": "Rocket",
            "title": "丰厚云资源抵扣",
            "description": "获得高达 $10,000 的 TiDB Cloud 使用额度，大幅降低早期基础设施成本。",
            "borderColor": "violet"
          },
          {
            "icon": "Users",
            "title": "专属技术护航",
            "description": "接入 PingCAP 专家网络，获取架构咨询、性能调优及紧急故障排查支持。",
            "borderColor": "violet"
          },
          {
            "icon": "Globe",
            "title": "全球市场拓展",
            "description": "加入全球初创社区，获得联合营销机会及投资人对接资源。",
            "borderColor": "violet"
          }
        ],
        "columns": 3,
        "borderStyle": "color"
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "startup-form",
      "type": "form",
      "props": {
        "title": "加入初创企业计划",
        "subtitle": "立即申请，验证您的初创资格并解锁专属福利。",
        "portalId": "4466002",
        "formId": "8d439c40-4e6b-4192-a99b-a2c619ad4146",
        "region": "na1"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "faq",
      "type": "faq",
      "props": {
        "title": "常见问题",
        "items": [
          {
            "q": "谁有资格申请 TiDB Cloud 初创企业计划？",
            "a": "成立少于 5 年、融资少于 Series B 轮或年营收低于特定阈值的科技初创企业均有资格申请。"
          },
          {
            "q": "安全白皮书包含哪些具体内容？",
            "a": "白皮书涵盖了阿里云环境下的网络架构安全、数据加密标准、身份访问管理 (IAM) 策略以及合规性认证详情。"
          },
          {
            "q": "申请后多久能收到审核结果？",
            "a": "通常在提交完整申请后的 2-3 个工作日内，我们的团队会通过邮件反馈审核结果。"
          }
        ]
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "cta",
      "type": "cta",
      "props": {
        "title": "准备好构建安全可扩展的未来了吗？",
        "subtitle": "无论是需要深度的安全合规指导，还是寻求业务成长的资源支持，TiDB 都是您的理想伙伴。",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "开始免费试用",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "联系销售团队",
          "href": "https://www.pingcap.com/contact-us/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "section"
      }
    }
  ]
}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}

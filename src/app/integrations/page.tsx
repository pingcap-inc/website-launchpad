import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Integrations: Kubernetes, Kafka, Spark and More",
  description: "Explore TiDB and TiDB Cloud integrations -- Kubernetes Operator, Kafka CDC, Spark (TiSpark), Terraform, and more. Deploy faster with TiDB.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/integrations/' },
  openGraph: {
    title: "TiDB Integrations: Kubernetes, Kafka, Spark and More",
    description: "Explore TiDB and TiDB Cloud integrations -- Kubernetes Operator, Kafka CDC, Spark (TiSpark), Terraform, and more. Deploy faster with TiDB.",
    url: 'https://www.pingcap.com/integrations/',
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
  path: "/integrations/",
  title: "TiDB Integrations: Kubernetes, Kafka, Spark and More",
  description: "Explore TiDB and TiDB Cloud integrations -- Kubernetes Operator, Kafka CDC, Spark (TiSpark), Terraform, and more. Deploy faster with TiDB.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "TiDB Integrations: Kubernetes, Kafka, Spark and Cloud", path: "/integrations/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Integrations: Kubernetes, Kafka, Spark and More",
  "meta": {
    "title": "TiDB Integrations: Kubernetes, Kafka, Spark and More",
    "description": "Explore TiDB and TiDB Cloud integrations -- Kubernetes Operator, Kafka CDC, Spark (TiSpark), Terraform, and more. Deploy faster with TiDB.",
    "canonical": "/integrations/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "Integrations & Compatibility",
        "headline": "TiDB Integrations: Kubernetes, Kafka, Spark and Cloud",
        "subheadline": "TiDB and TiDB Cloud integrate with the tools modern engineering teams already run. Fully MySQL protocol compatible with standard drivers, JDBC, ODBC, and popular ORMs like Hibernate, Prisma, and SQLAlchemy.",
        "primaryCta": {
          "text": "Start for Free",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "View Documentation",
          "href": "https://docs.pingcap.com/"
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
        "spacing": "hero",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/images/b326c259-module___headline_8.png",
            "alt": "module headline 8",
            "width": 1440,
            "height": 664
          }
        }
      }
    },
    {
      "id": "categories",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Integration Categories",
        "title": "TiDB Integration Categories (At-a-Glance)",
        "subtitle": "TiDB compatibility spans the modern data and application ecosystem.",
        "items": [
          {
            "icon": "Layers",
            "title": "Kubernetes and Cloud-Native",
            "description": "TiDB Operator, Prometheus, Grafana, Datadog, New Relic"
          },
          {
            "icon": "GitBranch",
            "title": "Streaming and CDC",
            "description": "Apache Kafka, TiCDC, Confluent, Apache Flink, Airbyte, dbt"
          },
          {
            "icon": "BarChart2",
            "title": "Analytics and HTAP",
            "description": "Apache Spark (TiSpark), Tableau, Power BI, Looker, Superset"
          },
          {
            "icon": "Brain",
            "title": "AI and MCP Integrations",
            "description": "LLM integrations, Model Context Protocol, AI-powered analytics"
          },
          {
            "icon": "Cloud",
            "title": "App Platforms and Serverless",
            "description": "AWS Lambda, Google Cloud Functions, Vercel, Railway"
          },
          {
            "icon": "Wrench",
            "title": "Infrastructure Automation",
            "description": "Terraform, Ansible, CloudFormation, Infrastructure as Code"
          },
          {
            "icon": "Database",
            "title": "Connectors, Drivers and ORMs",
            "description": "JDBC, ODBC, Go, Python, Node.js, Hibernate, SQLAlchemy, Prisma"
          },
          {
            "icon": "Globe",
            "title": "Cloud Providers and Marketplaces",
            "description": "AWS, Google Cloud, Azure, Alibaba Cloud, Huawei Cloud"
          }
        ],
        "columns": 4
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "kubernetes",
      "type": "featureCard",
      "props": {
        "eyebrow": "Kubernetes and Cloud-Native",
        "title": "Kubernetes and Cloud-Native Integrations for TiDB",
        "subtitle": "Run, scale, and monitor TiDB in production using cloud-native orchestration and observability tooling.",
        "items": [
          {
            "icon": {
              "url": "https://static.pingcap.com/images/cc84f879-image_209__1_.png",
              "alt": "image 209 1",
              "width": 76,
              "height": 76
            },
            "title": "Kubernetes (TiDB Operator)",
            "description": "Deploy and manage TiDB clusters natively on Kubernetes with automated scaling, upgrades, backup, and self-healing.",
            "href": "https://docs.pingcap.com/tidb-in-kubernetes/stable/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/bc97fc32-image_209__2_.png",
              "alt": "image 209 2",
              "width": 76,
              "height": 76
            },
            "title": "Prometheus",
            "description": "Collect real-time performance metrics from TiDB clusters for monitoring, alerting, and operational visibility.",
            "href": "https://docs.pingcap.com/tidbcloud/monitor-prometheus-and-grafana-integration/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/ece366eb-image_209__3_.png",
              "alt": "image 209 3",
              "width": 76,
              "height": 76
            },
            "title": "Grafana",
            "description": "Visualize TiDB performance metrics with prebuilt dashboards for cluster health, query latency, and storage insights.",
            "href": "https://docs.pingcap.com/tidbcloud/monitor-prometheus-and-grafana-integration/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/f37580ea-group.png",
              "alt": "group",
              "width": 177,
              "height": 45
            },
            "title": "Datadog",
            "description": "Export TiDB metrics into Datadog for centralized monitoring across cloud-native infrastructure.",
            "href": "https://docs.pingcap.com/tidbcloud/monitor-datadog-integration/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/75ac7f80-image_209__4_.png",
              "alt": "image 209 4",
              "width": 76,
              "height": 76
            },
            "title": "New Relic",
            "description": "Integrate TiDB observability data into New Relic APM workflows for full-stack monitoring.",
            "href": "https://docs.pingcap.com/tidbcloud/monitor-new-relic-integration/"
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "mysql-compatibility",
      "type": "cta",
      "props": {
        "title": "TiDB is Fully MySQL Compatible",
        "subtitle": " Most integrations rely on open standards like JDBC and ODBC — reducing friction when migrating or modernizing existing workloads. If you are modernizing legacy systems, see how to Modernize MySQL workloads with TiDB.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Modernize MySQL Workloads",
          "href": "https://www.pingcap.com/solutions/modernize-mysql-workloads/"
        },
        "secondaryCta": {
          "text": "Learn More",
          "href": "https://docs.pingcap.com/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "section"
      }
    },
    {
      "id": "streaming",
      "type": "featureCard",
      "props": {
        "eyebrow": "Streaming and CDC",
        "title": "Streaming and CDC Integrations for TiDB",
        "subtitle": "Real-time architectures depend on reliable change data capture and event streaming. TiDB supports CDC via TiCDC.",
        "items": [
          {
            "icon": {
              "url": "https://static.pingcap.com/images/b2eb0316-vector.png",
              "alt": "vector",
              "width": 127,
              "height": 59
            },
            "title": "Apache Kafka (TiCDC)",
            "description": "Stream real-time changes from TiDB to Kafka using TiCDC for event-driven architectures and data pipelines.",
            "href": "https://docs.pingcap.com/tidb/stable/replicate-data-to-kafka/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/2f624605-flink_logo_1.png",
              "alt": "flink logo 1",
              "width": 76,
              "height": 76
            },
            "title": "Apache Flink",
            "description": "Consume TiDB change streams in Flink for stateful stream processing and real-time analytics.",
            "href": "https://docs.pingcap.com/tidb/stable/replicate-data-to-kafka/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/aebab6c2-group__1_.png",
              "alt": "group 1",
              "width": 208,
              "height": 34
            },
            "title": "Confluent",
            "description": "Deliver TiDB change events into Confluent-compatible Kafka deployments for scalable streaming workflows.",
            "href": "https://docs.pingcap.com/tidb/stable/integrate-confluent-using-ticdc/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/7fcf8b38-image_210.png",
              "alt": "image 210",
              "width": 78,
              "height": 78
            },
            "title": "Airbyte",
            "description": "Use Airbyte connectors to move data into or out of TiDB for modern ELT pipelines.",
            "href": "https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-airbyte/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/d04f7083-group_1000011756.png",
              "alt": "group 1000011756",
              "width": 93,
              "height": 56
            },
            "title": "Amazon AppFlow",
            "description": "Integrate SaaS data into TiDB via AWS AppFlow for cloud-native data movement workflows.",
            "href": "https://docs.pingcap.com/developer/dev-guide-aws-appflow-integration/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/b26a8dbc-group_1000011757.png",
              "alt": "group 1000011757",
              "width": 132,
              "height": 50
            },
            "title": "dbt",
            "description": "Transform TiDB data using dbt in ELT pipelines for analytics engineering and modeling.",
            "href": "https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-dbt/"
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "analytics",
      "type": "featureCard",
      "props": {
        "eyebrow": "Analytics and HTAP",
        "title": "Analytics and HTAP Workloads",
        "subtitle": "TiDB is an HTAP database — handle transactional and analytical workloads on the same data without ETL duplication.",
        "items": [
          {
            "icon": {
              "url": "https://static.pingcap.com/images/62c28e7b-group__2_.png",
              "alt": "group 2",
              "width": 114,
              "height": 59
            },
            "title": "Apache Spark (TiSpark)",
            "description": "Run distributed Spark SQL queries directly on TiDB using TiSpark for large-scale analytics without ETL duplication.",
            "href": "https://github.com/pingcap/tispark"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/6b439b6e-image_211.png",
              "alt": "image 211",
              "width": 171,
              "height": 46
            },
            "title": "Tableau",
            "description": "Connect Tableau dashboards to TiDB for interactive visual analytics and business intelligence.",
            "href": "https://docs.pingcap.com/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/71ef3d44-image_212.png",
              "alt": "image 212",
              "width": 79,
              "height": 79
            },
            "title": "PowerBI",
            "description": "Integrate TiDB with Microsoft Power BI for unified data visualization and reporting.",
            "href": "https://docs.pingcap.com/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/2a039b5a-image_213.png",
              "alt": "image 213",
              "width": 78,
              "height": 78
            },
            "title": "Looker",
            "description": "Build self-service analytics with Looker's semantic layer connected to TiDB data.",
            "href": "https://docs.pingcap.com/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/b618a629-image_214.png",
              "alt": "image 214",
              "width": 98,
              "height": 98
            },
            "title": "Apache Superset",
            "description": "Create interactive, real-time dashboards with Superset using TiDB as a native data source.",
            "href": "https://docs.pingcap.com/"
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "drivers",
      "type": "featureCard",
      "props": {
        "eyebrow": "Application Development",
        "title": "Drivers, Connectors and ORM Compatibility",
        "subtitle": "TiDB is MySQL protocol compatible — all standard drivers work without modification.",
        "items": [
          {
            "icon": {
              "url": "https://static.pingcap.com/images/1c32ca50-java.svg",
              "alt": "java",
              "width": 241,
              "height": 76
            },
            "title": "JDBC and ODBC",
            "description": "Standard Java and system-level database connectivity with full ACID and transactional support.",
            "href": "https://docs.pingcap.com/developer/dev-guide-sample-application-java-jdbc/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/1df48ede-sola.svg",
              "alt": "sola",
              "width": 241,
              "height": 76
            },
            "title": "Python (SQLAlchemy, PyMySQL)",
            "description": "Connect Python applications using SQLAlchemy ORM and PyMySQL driver with native MySQL compatibility.",
            "href": "https://docs.pingcap.com/developer/dev-guide-sample-application-python-sqlalchemy/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/bf481bfe-node.svg",
              "alt": "node",
              "width": 241,
              "height": 76
            },
            "title": "Node.js (Prisma, Sequelize)",
            "description": "Use Prisma and Sequelize ORMs for Node.js with TiDB as a drop-in MySQL replacement.",
            "href": "https://docs.pingcap.com/developer/dev-guide-sample-application-nodejs-prisma/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/29432f87-image_218.png",
              "alt": "image 218",
              "width": 138,
              "height": 138
            },
            "title": "Go (gorm, database/sql)",
            "description": "Build Go applications with gorm and standard database/sql packages connecting to TiDB.",
            "href": "https://docs.pingcap.com/developer/dev-guide-sample-application-golang-sql-driver/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/780bb7fe-hiberbnate.svg",
              "alt": "hiberbnate",
              "width": 241,
              "height": 76
            },
            "title": "Hibernate (Java)",
            "description": "Use Hibernate with TiDB for object-relational mapping in Java enterprise applications.",
            "href": "https://docs.pingcap.com/developer/dev-guide-sample-application-java-hibernate/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/d90f076a-proxysql.svg",
              "alt": "proxysql",
              "width": 241,
              "height": 76
            },
            "title": "ProxySQL",
            "description": "Use ProxySQL for connection pooling and traffic routing in TiDB-compatible environments.",
            "href": "https://docs.pingcap.com/developer/dev-guide-proxysql-integration/"
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "cloud-providers",
      "type": "featureCard",
      "props": {
        "eyebrow": "Cloud Deployment",
        "title": "Cloud Providers and Marketplaces",
        "subtitle": "Deploy TiDB Cloud or self-hosted TiDB across all major cloud providers.",
        "items": [
          {
            "icon": {
              "url": "https://static.pingcap.com/images/8675b8f1-aws.svg",
              "alt": "aws",
              "width": 241,
              "height": 76
            },
            "title": "AWS",
            "description": "Deploy TiDB Cloud on AWS, access via CloudFormation, and use AWS AppFlow for data integration.",
            "href": "https://www.pingcap.com/partners/aws/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/f4f89345-google.svg",
              "alt": "google",
              "width": 241,
              "height": 66
            },
            "title": "Google Cloud Platform",
            "description": "Run TiDB on Google Cloud Bigtable or self-host with native GCP marketplace integrations.",
            "href": "https://docs.pingcap.com/tidb-in-kubernetes/stable/deploy-on-gcp-gke/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/927fb12f-azure.svg",
              "alt": "azure",
              "width": 241,
              "height": 66
            },
            "title": "Microsoft Azure",
            "description": "Deploy TiDB on Azure Kubernetes Service (AKS) with Azure Marketplace support.",
            "href": "https://www.pingcap.com/blog/tidb-cloud-dedicated-public-preview-microsoft-azure-distributed-sql/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/a81421d7-alibaba.svg",
              "alt": "alibaba",
              "width": 289,
              "height": 66
            },
            "title": "Alibaba Cloud",
            "description": "TiDB deployments on Alibaba Cloud with native marketplace and managed service options.",
            "href": "https://docs.pingcap.com/tidb-in-kubernetes/v1.3/deploy-on-alibaba-cloud/"
          },
          {
            "icon": "Layers",
            "title": "Self-Hosted (On-Premises)",
            "description": "Deploy TiDB on your own infrastructure using Kubernetes Operator or binary installation.",
            "href": "https://docs.pingcap.com/tidb-in-kubernetes/stable/"
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "featureCard-1778062110285",
      "type": "featureCard",
      "props": {
        "title": "Infrastructure Automation & DevOps Tooling",
        "subtitle": "Provision, manage, and govern TiDB clusters using infrastructure-as-code and database DevOps workflows.",
        "items": [
          {
            "icon": {
              "url": "https://static.pingcap.com/images/16724987-terraform.svg",
              "alt": "terraform",
              "width": 241,
              "height": 76
            },
            "title": "Terraform (TiDB Cloud Provider)",
            "description": "Provision and manage TiDB Cloud clusters using Terraform for infrastructure-as-code workflows.",
            "href": "https://docs.pingcap.com/tidbcloud/terraform-tidbcloud-provider-overview/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/32eb13f1-bytebase.svg",
              "alt": "bytebase",
              "width": 304,
              "height": 76
            },
            "title": "Bytebase",
            "description": "Manage TiDB schema migrations and database DevOps workflows with version control and approvals.",
            "href": "https://www.pingcap.com/blog/streamline-database-change-management-for-tidb-cloud-with-bytebase/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/334023fa-gitpod.svg",
              "alt": "gitpod",
              "width": 241,
              "height": 76
            },
            "title": "Gitpod",
            "description": "Spin up cloud-based development environments connected to TiDB for rapid prototyping.",
            "href": "https://docs.pingcap.com/developer/dev-guide-playground-gitpod/"
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "featureCard-1778062198951",
      "type": "featureCard",
      "props": {
        "title": "App Platforms & Serverless Deployments",
        "subtitle": "Connect modern serverless, SaaS, and edge applications to TiDB using standard MySQL-compatible drivers.",
        "items": [
          {
            "icon": {
              "url": "https://static.pingcap.com/images/f1391490-vercel.svg",
              "alt": "vercel",
              "width": 304,
              "height": 76
            },
            "title": "Vercel",
            "description": "Connect serverless and SaaS backends on Vercel to TiDB Cloud using standard MySQL drivers.",
            "href": "https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-vercel/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/d6b334af-netlify.svg",
              "alt": "netlify",
              "width": 241,
              "height": 76
            },
            "title": "Netlify",
            "description": "Integrate Netlify-hosted applications with TiDB via MySQL-compatible connectors.",
            "href": "https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-netlify/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/9ed13915-lambda.svg",
              "alt": "lambda",
              "width": 241,
              "height": 76
            },
            "title": "AWS Lambda",
            "description": "Use Lambda functions to query or write to TiDB using standard MySQL connectors in serverless architectures.",
            "href": "https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-aws-lambda/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/1d209cd1-cloudflare.svg",
              "alt": "cloudflare",
              "width": 241,
              "height": 76
            },
            "title": "Cloudflare",
            "description": "Build globally distributed applications connecting Cloudflare workers to TiDB Cloud endpoints.",
            "href": "https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-cloudflare/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/92ab7b63-zaiper.svg",
              "alt": "zaiper",
              "width": 241,
              "height": 76
            },
            "title": "Zapier",
            "description": "Automate workflows triggered by TiDB data changes using Zapier integrations.",
            "href": "https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-zapier/"
          },
          {
            "icon": {
              "url": "https://static.pingcap.com/images/2c15dffa-n8n.svg",
              "alt": "n8n",
              "width": 241,
              "height": 76
            },
            "title": "n8n",
            "description": "Create event-driven automation workflows integrating TiDB with SaaS tools via n8n.",
            "href": "https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-n8n/"
          }
        ],
        "columns": 3,
        "borderStyle": "gray"
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "final-cta",
      "type": "cta",
      "props": {
        "title": "Ready to Integrate TiDB into Your Tech Stack?",
        "subtitle": "Explore the full documentation for each integration, or get started with TiDB Cloud free trial today.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Start for Free",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "View All Documentation",
          "href": "https://docs.pingcap.com/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "section"
      }
    },
    {
      "id": "faq-1778062459306",
      "type": "faq",
      "props": {
        "title": "Integration FAQs",
        "items": [
          {
            "q": "Is TiDB fully MySQL compatible?",
            "a": "Yes. TiDB supports the MySQL protocol and works with standard MySQL drivers."
          },
          {
            "q": "Does TiDB integrate with Kafka?",
            "a": "Yes. TiCDC streams real-time changes to Apache Kafka and compatible platforms."
          },
          {
            "q": "Can I run Spark analytics on TiDB?",
            "a": "Yes. TiSpark enables distributed analytics with Apache Spark."
          },
          {
            "q": "Does TiDB support Kubernetes?",
            "a": "Yes. TiDB runs natively on Kubernetes using the TiDB Operator."
          },
          {
            "q": "What drivers does TiDB support?",
            "a": "Standard MySQL drivers including JDBC, ODBC, Go, Python, and Node.js connectors."
          },
          {
            "q": "Can I provision TiDB with Terraform?",
            "a": "Yes. TiDB Cloud provides a Terraform provider for automated infrastructure management."
          }
        ]
      },
      "style": {
        "background": "gradient-dark-bottom",
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

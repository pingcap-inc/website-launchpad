export type Locale = 'en' | 'es' | 'pt'

export const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
]

interface FeatureText {
  title: string
  description: string
}

interface HighScaleCardText {
  metricCaption: string
  title: string
  bullets: [string, string]
  ctaText: string
}

interface WhyCardText {
  title: string
  description: string
}

export interface LatamCopy {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
    primaryCta: string
    secondaryCta: string
  }
  logos: {
    trustedBy: string
  }
  architecture: {
    eyebrow: string
    title: string
    subtitle: string
    features: FeatureText[]
    viewMoreText: string
  }
  highScale: {
    eyebrow: string
    title: string
    subtitle: string
    cards: HighScaleCardText[]
  }
  modernization: {
    eyebrow: string
    title: string
    subtitle: string
    features: FeatureText[]
    secondaryLinks: string[]
  }
  ecosystem: {
    eyebrow: string
    title: string
    paragraphs: string[]
    viewMoreText: string
  }
  whyTidb: {
    eyebrow: string
    title: string
    subtitle: string
    cards: WhyCardText[]
  }
  cta: {
    modernize: { eyebrow: string; title: string; button: string }
    coDesign: { eyebrow: string; title: string; button: string }
  }
}

export const translations: Record<Locale, LatamCopy> = {
  en: {
    hero: {
      eyebrow: 'One database. Infinite possibilities.',
      headline:
        'Distributed SQL for <span class="text-gradient-red">Latin America\'s</span> Digital Future',
      subheadline:
        'Build scalable, AI-ready applications on a distributed SQL platform designed for always-on transactions, real-time intelligence, and cloud-native growth across Latin America.',
      primaryCta: 'Get started with TiDB Cloud',
      secondaryCta: 'Talk to our solutions team',
    },
    logos: {
      trustedBy: 'Trusted by teams building the future',
    },
    architecture: {
      eyebrow: '01 / Architecture',
      title: 'Digital-Native and AI-First Architectures',
      subtitle:
        'A unified operational layer for real-time applications and AI agents that need live data, semantic retrieval, and reliable state.',
      features: [
        {
          title: 'Modern Application Architectures',
          description:
            'Support microservices, event-driven systems, and multi-tenant applications requiring predictable latency and elastic horizontal scale.',
        },
        {
          title: 'AI-Native Operational Data',
          description:
            'Use TiDB as the unified data layer for application state and AI agent memory, combining relational data and vector embeddings in one database—so AI apps manage live state and run semantic search without separate vector and analytics databases.',
        },
        {
          title: 'Built for Always-on Consistency',
          description:
            'Deliver strongly consistent transactions, high availability, and predictable performance for mission-critical operational workloads as applications continue to grow.',
        },
      ],
      viewMoreText: 'Learn more about TiDB as an AI database with built-in vector search',
    },
    highScale: {
      eyebrow: '02 / SCALE',
      title: 'High-Scale Operations',
      subtitle:
        'Keep critical operational journeys responsive across fintech, ecommerce, and AI-native workloads as demand expands across clouds and regions.',
      cards: [
        {
          metricCaption: 'Availability',
          title: 'Fintech',
          bullets: [
            'Deliver real-time balances, authorizations, and ledger updates with strong consistency and high availability.',
            'Keep always-on payment and state-update flows responsive under high concurrency without hand-crafted sharding.',
          ],
          ctaText: 'Explore TiDB for Fintech',
        },
        {
          metricCaption: 'QPS',
          title: 'eCommerce',
          bullets: [
            'Handle orders, sessions, inventory, and flash events from a single distributed SQL cluster.',
            'Absorb seasonal peaks and unpredictable workload growth while keeping critical user journeys fast.',
          ],
          ctaText: 'Explore TiDB for eCommerce',
        },
        {
          metricCaption: 'Unified data layer',
          title: 'AI Native',
          bullets: [
            'Unify live application state, agent memory, relational data, and vector embeddings in one database.',
            'Let AI agents read and write operational state while performing semantic search over knowledge and events.',
          ],
          ctaText: 'Explore TiDB for AI',
        },
      ],
    },
    modernization: {
      eyebrow: '03 / Modernization',
      title: 'Database Modernization with TiDB',
      subtitle:
        'Move from single-node stacks to a MySQL-compatible distributed SQL path with guided migration tooling.',
      features: [
        {
          title: 'Modernize Single-Node Database Estates',
          description:
            'Modernize single-node databases through MySQL compatibility, enabling existing applications to migrate with minimal code changes.',
        },
        {
          title: 'Accelerate Migration with TiShift',
          description:
            "Assess existing workloads and automate schema and data migration into TiDB through TiShift's guided migration workflow.",
        },
        {
          title: 'Future-Proof Database Architecture',
          description:
            'Replace vertical scaling limitations and complex sharding with a cloud-native distributed SQL architecture.',
        },
        {
          title: 'Consolidate Operational and Analytical Workloads',
          description:
            'Run transactional processing and real-time analytics on one distributed SQL platform instead of maintaining multiple specialized databases.',
        },
      ],
      secondaryLinks: [
        'Explore TiDB for MySQL modernization',
        'See how teams modernize MySQL with TiDB in production',
        "Learn more about TiDB's large-scale OLTP capabilities",
      ],
    },
    ecosystem: {
      eyebrow: '04 / Ecosystem',
      title: 'Grounded Partner Ecosystem',
      paragraphs: [
        'Run TiDB Cloud on AWS, Google Cloud and Alibaba Cloud using infrastructure your teams already trust.',
        'Work with regional implementation partners who understand local regulations, performance expectations, and enterprise deployment requirements across Latin America.',
        'Integrate TiDB with your existing security, observability, and data ecosystem instead of rebuilding your technology stack.',
      ],
      viewMoreText: 'Explore the PingCAP Partner Ecosystem',
    },
    whyTidb: {
      eyebrow: '05 / WHY TIDB',
      title: 'Why Teams in Latin America Choose TiDB',
      subtitle:
        'Practical reasons to consolidate, scale, and build AI-connected applications on one distributed SQL platform.',
      cards: [
        {
          title: 'Cost-Efficient at Scale',
          description:
            'Reduce total database cost through horizontal scalability while consolidating transactional, analytical, vector, and AI workloads onto one distributed SQL platform.',
        },
        {
          title: 'Multi-Cloud, Region-Aware',
          description:
            'Deploy across AWS and Google Cloud with data residing closer to users throughout Latin America.',
        },
        {
          title: 'Proven Database Modernization',
          description:
            'Adopt a MySQL-compatible modernization path validated by organizations running business-critical workloads at scale.',
        },
        {
          title: 'Enterprise-Grade Security',
          description:
            'Operate with SOC 2-compliant controls, independently audited security practices, and comprehensive trust resources.',
        },
        {
          title: 'Built for AI-Connected Applications',
          description:
            'Power real-time applications and AI agents using a unified operational data platform supporting both structured data and vector search.',
        },
      ],
    },
    cta: {
      modernize: {
        eyebrow: 'Ready for the next step?',
        title: 'Ready to modernize your database for Latin America?',
        button: 'Get started with TiDB Cloud',
      },
      coDesign: {
        eyebrow: 'Architecture workshop',
        title: 'Want to co-design a high-scale architecture with our team?',
        button: 'Talk to our solutions team',
      },
    },
  },

  es: {
    hero: {
      eyebrow: 'Una base de datos. Posibilidades infinitas.',
      headline:
        'SQL Distribuido para el Futuro Digital de <span class="text-gradient-red">América Latina</span>',
      subheadline:
        'Crea aplicaciones escalables y listas para IA sobre una plataforma SQL distribuida diseñada para transacciones siempre activas, inteligencia en tiempo real y crecimiento nativo en la nube en toda América Latina.',
      primaryCta: 'Comienza con TiDB Cloud',
      secondaryCta: 'Habla con nuestro equipo de soluciones',
    },
    logos: {
      trustedBy: 'La confianza de equipos que construyen el futuro',
    },
    architecture: {
      eyebrow: '01 / Arquitectura',
      title: 'Arquitecturas Nativas Digitales y con IA Primero',
      subtitle:
        'Una capa operativa unificada para aplicaciones en tiempo real y agentes de IA que necesitan datos en vivo, recuperación semántica y un estado confiable.',
      features: [
        {
          title: 'Arquitecturas de Aplicaciones Modernas',
          description:
            'Soporta microservicios, sistemas basados en eventos y aplicaciones multiinquilino que requieren latencia predecible y escalado horizontal elástico.',
        },
        {
          title: 'Datos Operativos Nativos de IA',
          description:
            'Usa TiDB como la capa de datos unificada para el estado de las aplicaciones y la memoria de los agentes de IA, combinando datos relacionales y embeddings vectoriales en una sola base de datos, para que las aplicaciones de IA gestionen el estado en vivo y ejecuten búsquedas semánticas sin bases de datos vectoriales y analíticas separadas.',
        },
        {
          title: 'Diseñado para una Consistencia Siempre Activa',
          description:
            'Ofrece transacciones fuertemente consistentes, alta disponibilidad y rendimiento predecible para cargas de trabajo operativas críticas a medida que las aplicaciones siguen creciendo.',
        },
      ],
      viewMoreText:
        'Descubre más sobre TiDB como base de datos de IA con búsqueda vectorial integrada',
    },
    highScale: {
      eyebrow: '02 / ESCALA',
      title: 'Operaciones de Alta Escala',
      subtitle:
        'Mantén los flujos operativos críticos con buen rendimiento en fintech, comercio electrónico y cargas de trabajo nativas de IA, a medida que la demanda crece en nubes y regiones.',
      cards: [
        {
          metricCaption: 'Disponibilidad',
          title: 'Fintech',
          bullets: [
            'Entrega saldos en tiempo real, autorizaciones y actualizaciones de libro mayor con fuerte consistencia y alta disponibilidad.',
            'Mantén los flujos de pago y actualización de estado siempre activos y con buen rendimiento bajo alta concurrencia, sin sharding manual.',
          ],
          ctaText: 'Descubre TiDB para Fintech →',
        },
        {
          metricCaption: 'QPS',
          title: 'eCommerce',
          bullets: [
            'Gestiona pedidos, sesiones, inventario y eventos de alta demanda desde un solo clúster SQL distribuido.',
            'Absorbe picos estacionales y crecimiento impredecible de la carga de trabajo manteniendo rápidos los recorridos críticos del usuario.',
          ],
          ctaText: 'Descubre TiDB para eCommerce →',
        },
        {
          metricCaption: 'Capa de datos unificada',
          title: 'IA Nativa',
          bullets: [
            'Unifica el estado de la aplicación en vivo, la memoria de los agentes, los datos relacionales y los embeddings vectoriales en una sola base de datos.',
            'Permite que los agentes de IA lean y escriban el estado operativo mientras realizan búsquedas semánticas sobre conocimiento y eventos.',
          ],
          ctaText: 'Descubre TiDB para IA →',
        },
      ],
    },
    modernization: {
      eyebrow: '03 / Modernización',
      title: 'Modernización de Bases de Datos con TiDB',
      subtitle:
        'Pasa de arquitecturas de un solo nodo a una ruta SQL distribuida compatible con MySQL, con herramientas de migración guiada.',
      features: [
        {
          title: 'Moderniza Bases de Datos de un Solo Nodo',
          description:
            'Moderniza bases de datos de un solo nodo mediante compatibilidad con MySQL, permitiendo que las aplicaciones existentes migren con cambios mínimos de código.',
        },
        {
          title: 'Acelera la Migración con TiShift',
          description:
            'Evalúa las cargas de trabajo existentes y automatiza la migración de esquemas y datos a TiDB mediante el flujo de migración guiada de TiShift.',
        },
        {
          title: 'Arquitectura de Bases de Datos a Prueba de Futuro',
          description:
            'Reemplaza las limitaciones del escalado vertical y el sharding complejo con una arquitectura SQL distribuida y nativa de la nube.',
        },
        {
          title: 'Consolida Cargas de Trabajo Operativas y Analíticas',
          description:
            'Ejecuta el procesamiento transaccional y la analítica en tiempo real en una sola plataforma SQL distribuida, en lugar de mantener múltiples bases de datos especializadas.',
        },
      ],
      secondaryLinks: [
        'Descubre TiDB para la modernización de MySQL',
        'Descubre cómo los equipos modernizan MySQL con TiDB en producción',
        'Conoce más sobre las capacidades OLTP a gran escala de TiDB',
      ],
    },
    ecosystem: {
      eyebrow: '04 / Ecosistema',
      title: 'Ecosistema de Socios con Presencia Local',
      paragraphs: [
        'Ejecuta TiDB Cloud en AWS, Google Cloud y Alibaba Cloud usando la infraestructura en la que tus equipos ya confían.',
        'Trabaja con socios de implementación regionales que comprenden las regulaciones locales, las expectativas de rendimiento y los requisitos de implementación empresarial en toda América Latina.',
        'Integra TiDB con tu ecosistema existente de seguridad, observabilidad y datos, en lugar de reconstruir tu stack tecnológico.',
      ],
      viewMoreText: 'Descubre el ecosistema de socios de PingCAP',
    },
    whyTidb: {
      eyebrow: '05 / POR QUÉ TIDB',
      title: 'Por Qué los Equipos en América Latina Eligen TiDB',
      subtitle:
        'Razones prácticas para consolidar, escalar y construir aplicaciones conectadas a IA sobre una sola plataforma SQL distribuida.',
      cards: [
        {
          title: 'Eficiente en Costos a Escala',
          description:
            'Reduce el costo total de la base de datos mediante escalabilidad horizontal, consolidando cargas de trabajo transaccionales, analíticas, vectoriales y de IA en una sola plataforma SQL distribuida.',
        },
        {
          title: 'Multi-Nube y Consciente de la Región',
          description:
            'Despliega en AWS y Google Cloud con datos ubicados más cerca de los usuarios en toda América Latina.',
        },
        {
          title: 'Modernización de Bases de Datos Comprobada',
          description:
            'Adopta una ruta de modernización compatible con MySQL, validada por organizaciones que ejecutan cargas de trabajo críticas para el negocio a escala.',
        },
        {
          title: 'Seguridad de Nivel Empresarial',
          description:
            'Opera con controles conformes a SOC 2, prácticas de seguridad auditadas de forma independiente y recursos de confianza integrales.',
        },
        {
          title: 'Diseñado para Aplicaciones Conectadas a IA',
          description:
            'Impulsa aplicaciones en tiempo real y agentes de IA usando una plataforma de datos operativa unificada que admite tanto datos estructurados como búsqueda vectorial.',
        },
      ],
    },
    cta: {
      modernize: {
        eyebrow: '¿Listo para el siguiente paso?',
        title: '¿Listo para modernizar tu base de datos para América Latina?',
        button: 'Comienza con TiDB Cloud',
      },
      coDesign: {
        eyebrow: 'Taller de arquitectura',
        title: '¿Quieres co-diseñar una arquitectura de alta escala con nuestro equipo?',
        button: 'Habla con nuestro equipo de soluciones',
      },
    },
  },

  pt: {
    hero: {
      eyebrow: 'Um banco de dados. Possibilidades infinitas.',
      headline:
        'SQL Distribuído para o Futuro Digital da <span class="text-gradient-red">América Latina</span>',
      subheadline:
        'Crie aplicações escaláveis e prontas para IA em uma plataforma SQL distribuída projetada para transações sempre ativas, inteligência em tempo real e crescimento nativo em nuvem em toda a América Latina.',
      primaryCta: 'Comece com o TiDB Cloud',
      secondaryCta: 'Fale com nossa equipe de soluções',
    },
    logos: {
      trustedBy: 'A confiança de equipes que constroem o futuro',
    },
    architecture: {
      eyebrow: '01 / Arquitetura',
      title: 'Arquiteturas Nativas Digitais e Focadas em IA',
      subtitle:
        'Uma camada operacional unificada para aplicações em tempo real e agentes de IA que precisam de dados em tempo real, recuperação semântica e estado confiável.',
      features: [
        {
          title: 'Arquiteturas de Aplicações Modernas',
          description:
            'Suporta microsserviços, sistemas orientados a eventos e aplicações multilocatário que exigem latência previsível e escalabilidade horizontal elástica.',
        },
        {
          title: 'Dados Operacionais Nativos de IA',
          description:
            'Use o TiDB como a camada de dados unificada para o estado das aplicações e a memória dos agentes de IA, combinando dados relacionais e embeddings vetoriais em um único banco de dados—para que aplicações de IA gerenciem o estado em tempo real e realizem buscas semânticas sem bancos de dados vetoriais e analíticos separados.',
        },
        {
          title: 'Construído para Consistência Sempre Ativa',
          description:
            'Ofereça transações fortemente consistentes, alta disponibilidade e desempenho previsível para cargas de trabalho operacionais críticas à medida que as aplicações continuam crescendo.',
        },
      ],
      viewMoreText:
        'Saiba mais sobre o TiDB como banco de dados de IA com busca vetorial integrada',
    },
    highScale: {
      eyebrow: '02 / ESCALA',
      title: 'Operações de Alta Escala',
      subtitle:
        'Mantenha os fluxos operacionais críticos responsivos em fintech, e-commerce e cargas de trabalho nativas de IA, à medida que a demanda cresce em nuvens e regiões.',
      cards: [
        {
          metricCaption: 'Disponibilidade',
          title: 'Fintech',
          bullets: [
            'Entregue saldos em tempo real, autorizações e atualizações de razão contábil com forte consistência e alta disponibilidade.',
            'Mantenha os fluxos de pagamento e atualização de estado sempre ativos e responsivos sob alta concorrência, sem sharding manual.',
          ],
          ctaText: 'Conheça o TiDB para Fintech →',
        },
        {
          metricCaption: 'QPS',
          title: 'eCommerce',
          bullets: [
            'Gerencie pedidos, sessões, estoque e eventos de pico a partir de um único cluster SQL distribuído.',
            'Absorva picos sazonais e crescimento imprevisível da carga de trabalho mantendo rápidas as jornadas críticas do usuário.',
          ],
          ctaText: 'Conheça o TiDB para eCommerce →',
        },
        {
          metricCaption: 'Camada de dados unificada',
          title: 'IA Nativa',
          bullets: [
            'Unifique o estado da aplicação em tempo real, a memória dos agentes, os dados relacionais e os embeddings vetoriais em um único banco de dados.',
            'Permita que agentes de IA leiam e gravem o estado operacional enquanto realizam buscas semânticas sobre conhecimento e eventos.',
          ],
          ctaText: 'Conheça o TiDB para IA →',
        },
      ],
    },
    modernization: {
      eyebrow: '03 / Modernização',
      title: 'Modernização de Banco de Dados com o TiDB',
      subtitle:
        'Migre de estruturas de nó único para um caminho SQL distribuído compatível com MySQL, com ferramentas de migração guiada.',
      features: [
        {
          title: 'Modernize Bancos de Dados de Nó Único',
          description:
            'Modernize bancos de dados de nó único por meio da compatibilidade com MySQL, permitindo que aplicações existentes migrem com mudanças mínimas de código.',
        },
        {
          title: 'Acelere a Migração com o TiShift',
          description:
            'Avalie as cargas de trabalho existentes e automatize a migração de esquema e dados para o TiDB por meio do fluxo de migração guiada do TiShift.',
        },
        {
          title: 'Arquitetura de Banco de Dados Preparada para o Futuro',
          description:
            'Substitua as limitações de escalabilidade vertical e o sharding complexo por uma arquitetura SQL distribuída e nativa da nuvem.',
        },
        {
          title: 'Consolide Cargas de Trabalho Operacionais e Analíticas',
          description:
            'Execute processamento transacional e análises em tempo real em uma única plataforma SQL distribuída, em vez de manter vários bancos de dados especializados.',
        },
      ],
      secondaryLinks: [
        'Conheça o TiDB para modernização do MySQL',
        'Veja como as equipes modernizam o MySQL com o TiDB em produção',
        'Saiba mais sobre os recursos OLTP em larga escala do TiDB',
      ],
    },
    ecosystem: {
      eyebrow: '04 / Ecossistema',
      title: 'Ecossistema de Parceiros com Presença Local',
      paragraphs: [
        'Execute o TiDB Cloud na AWS, no Google Cloud e na Alibaba Cloud usando a infraestrutura em que suas equipes já confiam.',
        'Trabalhe com parceiros de implementação regionais que entendem as regulamentações locais, as expectativas de desempenho e os requisitos de implantação empresarial em toda a América Latina.',
        'Integre o TiDB ao seu ecossistema existente de segurança, observabilidade e dados, em vez de reconstruir sua pilha tecnológica.',
      ],
      viewMoreText: 'Conheça o ecossistema de parceiros da PingCAP',
    },
    whyTidb: {
      eyebrow: '05 / POR QUE O TIDB',
      title: 'Por Que as Equipes na América Latina Escolhem o TiDB',
      subtitle:
        'Razões práticas para consolidar, escalar e construir aplicações conectadas a IA em uma única plataforma SQL distribuída.',
      cards: [
        {
          title: 'Eficiente em Custos na Escala',
          description:
            'Reduza o custo total do banco de dados por meio da escalabilidade horizontal, consolidando cargas de trabalho transacionais, analíticas, vetoriais e de IA em uma única plataforma SQL distribuída.',
        },
        {
          title: 'Multi-Nuvem e Consciente da Região',
          description:
            'Implante na AWS e no Google Cloud com dados localizados mais próximos dos usuários em toda a América Latina.',
        },
        {
          title: 'Modernização de Banco de Dados Comprovada',
          description:
            'Adote um caminho de modernização compatível com MySQL, validado por organizações que executam cargas de trabalho críticas para os negócios em escala.',
        },
        {
          title: 'Segurança de Nível Empresarial',
          description:
            'Opere com controles em conformidade com a SOC 2, práticas de segurança auditadas de forma independente e recursos abrangentes de confiança.',
        },
        {
          title: 'Construído para Aplicações Conectadas a IA',
          description:
            'Impulsione aplicações em tempo real e agentes de IA usando uma plataforma de dados operacional unificada que oferece suporte a dados estruturados e busca vetorial.',
        },
      ],
    },
    cta: {
      modernize: {
        eyebrow: 'Pronto para o próximo passo?',
        title: 'Pronto para modernizar seu banco de dados para a América Latina?',
        button: 'Comece com o TiDB Cloud',
      },
      coDesign: {
        eyebrow: 'Workshop de arquitetura',
        title: 'Quer co-criar uma arquitetura de alta escala com nossa equipe?',
        button: 'Fale com nossa equipe de soluções',
      },
    },
  },
}

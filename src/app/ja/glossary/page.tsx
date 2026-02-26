import type { Metadata } from 'next'
import { Navbar, Footer, HeroSection, CtaSection, JsonLd } from '@/components'
import { buildPageSchema, glossaryIndexSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'データベース＆TiDB用語集 — 主要用語の解説 | PingCAP',
  description: 'TiDB製品とドキュメント全体で使用されるデータベース、分散システム、クラウドネイティブの主要用語の定義集。HTAPからTiKVまで。',
  keywords: ['データベース用語集', 'HTAP定義', '分散データベース用語', 'NewSQL用語集', 'TiDB用語'],
  openGraph: {
    title: 'データベース＆TiDB用語集 — 主要用語の解説',
    description: 'TiDB製品とドキュメント全体で使用されるデータベース、分散システム、クラウドネイティブの主要用語の定義集。',
    url: 'https://www.pingcap.com/ja/glossary/',
    siteName: 'PingCAP',
    images: [{ url: 'https://www.pingcap.com/og/glossary.png', width: 1200, height: 630 }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'データベース＆TiDB用語集',
    description: 'データベースと分散システムの主要用語を解説。',
    images: ['https://www.pingcap.com/og/glossary.png'],
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.pingcap.com/ja/glossary/',
    languages: {
      'en': 'https://www.pingcap.com/glossary/',
      'ja': 'https://www.pingcap.com/ja/glossary/',
      'x-default': 'https://www.pingcap.com/glossary/',
    },
  },
}

// ─── Glossary data (Japanese) ─────────────────────────────────────────────────

const terms = [
  {
    category: 'コアデータベース用語',
    items: [
      {
        term: 'HTAP',
        fullName: 'ハイブリッドトランザクション/分析処理',
        definition:
          'トランザクション（OLTP）と分析（OLAP）の両ワークロードを同一システム上で同時処理するデータベースアーキテクチャです。HTAPはデータベースの分離とETLパイプラインを不要にし、ライブのトランザクションデータに対するリアルタイム分析を実現します。TiDBはHTAPワークロード向けに設計されています。',
      },
      {
        term: 'OLTP',
        fullName: 'オンライントランザクション処理',
        definition:
          '挿入・更新・削除などの高頻度・短時間トランザクションを特徴とするデータベースワークロードです。OLTPシステムは低レイテンシと高い同時実行性を優先します。ECサイトの注文処理や銀行取引などが代表的な例です。',
      },
      {
        term: 'OLAP',
        fullName: 'オンライン分析処理',
        definition:
          'ビジネスインテリジェンスやレポーティングのために大規模データセットに対する複雑なクエリを実行するデータベースワークロードです。OLAPクエリは多数の行をスキャンして集計処理を行います。従来は独立したデータウェアハウスで処理されていましたが、TiDBのカラム型ストレージエンジン（TiFlash）により、同一クラスター上でOLAP機能を提供します。',
      },
      {
        term: 'NewSQL',
        fullName: 'NewSQL',
        definition:
          'NoSQLシステムのスケーラビリティを維持しながら、従来のRDBMSのACID保証とSQLインターフェースを提供する現代のリレーショナルデータベースカテゴリです。TiDBはNewSQLデータベースであり、NoSQLのように水平スケールしながら完全なMySQL互換性を保ちます。',
      },
      {
        term: 'Distributed SQL',
        fullName: '分散SQLデータベース',
        definition:
          '水平スケーラビリティとフォールトトレランスのために複数ノード間でデータとクエリ処理を分散するSQLデータベースです。シャーディングされたMySQLとは異なり、分散SQLデータベースはデータ分散を透過的に処理します。アプリケーションは標準のSQLインターフェースを通じて操作でき、パーティショニング・レプリケーション・ルーティングはデータベースが内部で管理します。',
      },
    ],
  },
  {
    category: 'TiDB固有の用語',
    items: [
      {
        term: 'TiKV',
        fullName: 'Ti Key-Valueストア',
        definition:
          'TiDBを支える分散トランザクションキーバリューストレージエンジンです。TiKVはRaftコンセンサスアルゴリズムによる強整合性を維持しながら、複数ノードにデータを分散保存します。CNCFの卒業プロジェクトとして、SQLレイヤー不要な分散キーバリューストアを必要とするチーム向けにスタンドアロンでも利用可能です。',
      },
      {
        term: 'TiFlash',
        fullName: 'TiFlashカラム型ストレージ',
        definition:
          'リアルタイムOLAPクエリを実現するTiDBのカラム型ストレージ拡張機能です。TiFlashはTiKVデータのカラム型レプリカを非同期で維持し、分析クエリをカラム指向ストレージ上で実行することで大幅なパフォーマンス向上を実現します。TiKV上のトランザクションワークロードへの影響はありません。',
      },
      {
        term: 'PD',
        fullName: 'プレースメントドライバー',
        definition:
          'TiDBクラスターのメタデータ管理コンポーネントです。PDはクラスタートポロジーの保存、トランザクションID（タイムスタンプ）の割り当て、TiKVノード間のデータ配置とロードバランシングのオーケストレーションを担当します。内部では分散コンセンサスのためにetcdを使用しています。',
      },
      {
        term: 'Raft',
        fullName: 'Raftコンセンサスアルゴリズム',
        definition:
          'TiKVがレプリカ間のデータ整合性を確保するために使用する分散コンセンサスアルゴリズムです。Raftは各データリージョンに対してリーダーノードを選出し、すべての書き込みはコミット前にレプリカの過半数による承認が必要です。ノード障害発生時でも強整合性を保証します。',
      },
    ],
  },
  {
    category: 'クラウド＆インフラ用語',
    items: [
      {
        term: 'Horizontal Scaling',
        fullName: '水平スケーリング（スケールアウト）',
        definition:
          '単一ノードへのリソース追加（垂直スケーリング）とは対照的に、分散システムにノードを追加して容量を増加させる手法です。TiDBは水平スケーリングに対応しており、TiKVノードの追加でストレージとスループットを、TiDBノードの追加でクエリの同時実行性を向上できます。ダウンタイムは不要です。',
      },
      {
        term: 'Multi-Tenancy',
        fullName: 'マルチテナンシー',
        definition:
          '単一のデータベースクラスターが複数のテナント（顧客やチーム）にリソースとデータを分離して提供するアーキテクチャです。TiDB Cloudはリソースグループとアクセス制御によるマルチテナンシーをサポートし、共有インフラストラクチャでテナントレベルの分離を実現します。',
      },
      {
        term: 'Elastic Scaling',
        fullName: 'エラスティックスケーリング',
        definition:
          'ワークロードの変化に応じてデータベースリソースを自動的にスケールアップ・ダウンする機能です。TiDB Cloudはエラスティックスケーリングを提供し、トラフィック急増時にはクラスターが拡張、ピークオフ時には縮小することで、手動操作なしにコストを最適化します。',
      },
      {
        term: 'ACID',
        fullName: '原子性・整合性・独立性・永続性',
        definition:
          '信頼性の高いデータベーストランザクションを保証する4つの特性です。TiDBは分散レベルで完全なACIDコンプライアンスを提供します。トランザクションはすべてのノードにわたってコミットされるか完全にロールバックされ、マルチリージョン展開でも同様に保証されます。',
      },
    ],
  },
]

const schema = buildPageSchema({
  path: '/ja/glossary/',
  title: 'データベース＆TiDB用語集 — 主要用語の解説 | PingCAP',
  description: 'TiDB製品とドキュメント全体で使用されるデータベース、分散システム、クラウドネイティブの主要用語の定義集。',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'ホーム', path: '/ja/' },
    { name: '用語集', path: '/ja/glossary/' },
  ],
  image: 'https://www.pingcap.com/og/glossary.png',
  extraSchemas: [glossaryIndexSchema({ termCount: terms.reduce((acc, c) => acc + c.items.length, 0) })],
})

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GlossaryPageJa() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="pt-[62px] lg:pt-20">

        {/* Hero */}
        <HeroSection
          eyebrow="用語集"
          headline="データベース用語を、わかりやすく"
          subheadline="分散データベース、クラウドネイティブ、TiDB固有の用語をエンジニア向けに明確に解説します。"
        />

        {/* Term sections */}
        {terms.map((category) => (
          <section
            key={category.category}
            className="py-section-sm lg:py-section bg-bg-primary"
            aria-labelledby={`section-${category.category}`}
          >
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">

              {/* Category heading */}
              <h2
                id={`section-${category.category}`}
                className="font-mono text-eyebrow text-carbon-400 mb-12"
              >
                {category.category.toUpperCase()}
              </h2>

              {/* Terms */}
              <div className="flex flex-col gap-0 divide-y divide-border-subtle/20">
                {category.items.map((item) => (
                  <article
                    key={item.term}
                    className="py-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12"
                  >
                    <div className="md:col-span-1">
                      <h3 className="text-h3-lg font-bold text-text-inverse mb-1">
                        {item.term}
                      </h3>
                      {item.fullName !== item.term && (
                        <p className="text-body-sm text-text-inverse/40 font-mono">
                          {item.fullName}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-body-md text-text-inverse/75 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <CtaSection
          title="概念を実際に試してみませんか？"
          subtitle="TiDB CloudはHTAP、エラスティックスケーリング、MySQL互換性をフルマネージドサービスで提供します。"
          primaryCta={{ text: '無料で始める', href: '/signup/' }}
          secondaryCta={{ text: 'ドキュメントを読む', href: '/docs/' }}
          background="red"
        />

      </main>
      <Footer />
    </>
  )
}

import { Eyebrow, Title, Sub, Card, KpiGrid, KpiCard } from "@/components/cockpit/primitives";

export default function Home() {
  return (
    <>
      <Eyebrow>Cockpit · Gemflow</Eyebrow>
      <Title>Atelier Intelligence</Title>
      <Sub>
        Shell Cockpit · accent variable via <code>data-product</code> sur <code>html</code>. Chat Kimi K2.6
        permanent dans le rail droit. Backend Spring Boot <code>:7001</code> via rewrites Next.
      </Sub>

      <KpiGrid>
        <KpiCard label="Commandes en cours" value="—" hint="depuis le backend" />
        <KpiCard label="En retard" value="—" hint="OVERDUE" />
        <KpiCard label="À risque" value="—" hint="AT_RISK" />
        <KpiCard label="Services actifs" value="5" hint="Supabase · Kimi · Backend" />
      </KpiGrid>

      <Card title="Mise en route">
        <p>
          Le shell est posé. Cette zone <code>.ct-page-area</code> reçoit chaque page projet. Composer
          avec les primitives <code>Eyebrow</code>, <code>Title</code>, <code>Sub</code>, <code>Card</code>,{" "}
          <code>KpiGrid</code>, <code>KpiCard</code> (mappées 1:1 sur les classes <code>.ct-*</code>).
        </p>
        <p style={{ marginTop: 12 }}>
          Les assets du catalogue Hearst (charts, KPIs, viz) sont disponibles via Web Component{" "}
          <code>&lt;hearst-asset id=&quot;…&quot;/&gt;</code> après chargement de <code>/hearst-asset.js</code>.
        </p>
      </Card>

      <Card title="Routes prêtes">
        <ul style={{ marginTop: 8, paddingLeft: 18 }}>
          <li><code>/</code> — cette page (dashboard)</li>
          <li><code>/api/cockpit-chat</code> — streaming Kimi K2.6</li>
          <li><code>/api/backend/*</code> → proxy vers Spring Boot <code>:7001/api/*</code></li>
        </ul>
      </Card>
    </>
  );
}

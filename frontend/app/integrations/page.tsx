"use client";

import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";

export default function IntegrationsPage() {
  return (
    <>
      <Eyebrow>Système · Intégrations</Eyebrow>
      <Title>Integrations</Title>
      <Sub>Connexions aux services externes</Sub>
      <Card title="À venir">
        <p>
          Page en construction. Endpoint backend attendu :{" "}
          <code>/api/v1/integrations/quickbooks</code>.
        </p>
      </Card>
    </>
  );
}

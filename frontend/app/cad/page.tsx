"use client";

import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";

export default function CadPage() {
  return (
    <>
      <Eyebrow>Pré-production · CAD</Eyebrow>
      <Title>CAD</Title>
      <Sub>Conception assistée par ordinateur</Sub>
      <Card title="À venir">
        <p>
          Page en construction. Endpoint backend attendu :{" "}
          <code>/api/v1/orders/{"{id}"}/cad</code>.
        </p>
      </Card>
    </>
  );
}

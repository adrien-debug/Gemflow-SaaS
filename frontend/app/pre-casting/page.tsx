"use client";

import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";

export default function PreCastingPage() {
  return (
    <>
      <Eyebrow>Pré-production · Pre-casting</Eyebrow>
      <Title>Pre Casting</Title>
      <Sub>Préparation avant coulée</Sub>
      <Card title="À venir">
        <p>
          Page en construction. Endpoint backend attendu :{" "}
          <code>/api/v1/order-metal-castings</code>.
        </p>
      </Card>
    </>
  );
}

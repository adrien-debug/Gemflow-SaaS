"use client";

import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";

export default function AiAgentPage() {
  return (
    <>
      <Eyebrow>Atelier · AI Agent</Eyebrow>
      <Title>AI Agent</Title>
      <Sub>Assistant IA intégré à l&apos;atelier</Sub>
      <Card title="À venir">
        <p>
          Page en construction. Endpoint backend attendu :{" "}
          <code>interne — chat Kimi dans rail droit</code>.
        </p>
      </Card>
    </>
  );
}

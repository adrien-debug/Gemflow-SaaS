"use client";

import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";

export default function StockPage() {
  return (
    <>
      <Eyebrow>Atelier · Stock</Eyebrow>
      <Title>Stock</Title>
      <Sub>Gestion des stocks atelier</Sub>
      <Card title="À venir">
        <p>
          Page en construction. Endpoint backend attendu :{" "}
          <code>/api/v1/orders (filtré par stock)</code>.
        </p>
      </Card>
    </>
  );
}

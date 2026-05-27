"use client";

import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";

export default function PermissionsPage() {
  return (
    <>
      <Eyebrow>Sécurité · Permissions</Eyebrow>
      <Title>Permissions</Title>
      <Sub>Gestion des droits d&apos;accès</Sub>
      <Card title="À venir">
        <p>
          Page en construction. Endpoint backend attendu :{" "}
          <code>/api/v1/permissions</code>.
        </p>
      </Card>
    </>
  );
}

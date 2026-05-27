"use client";

import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";

export default function ProfilePage() {
  return (
    <>
      <Eyebrow>Compte · Profil</Eyebrow>
      <Title>Profile</Title>
      <Sub>Informations du compte utilisateur</Sub>
      <Card title="À venir">
        <p>
          Page en construction. Endpoint backend attendu :{" "}
          <code>/api/v1/users/current</code>.
        </p>
      </Card>
    </>
  );
}

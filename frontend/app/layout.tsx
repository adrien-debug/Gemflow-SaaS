import type { Metadata } from "next";
import "./cockpit.css";
import { CockpitShell } from "@/components/cockpit/CockpitShell";

export const metadata: Metadata = {
  title: "Gemflow · Cockpit",
  description: "Atelier Intelligence — Gemflow SaaS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-product="default">
      <body>
        <CockpitShell>{children}</CockpitShell>
      </body>
    </html>
  );
}

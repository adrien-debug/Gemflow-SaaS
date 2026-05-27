import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ct-bg, #1a0a1e)",
        padding: "var(--ct-space-6, 24px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "var(--ct-surface, rgba(255,255,255,0.04))",
          border: "1px solid var(--ct-border, rgba(255,255,255,0.08))",
          borderRadius: "var(--ct-radius-lg, 12px)",
          padding: "var(--ct-space-8, 32px)",
          backdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ct-space-6, 24px)",
        }}
      >
        <div>
          <div
            className="ct-eyebrow"
            style={{ marginBottom: "var(--ct-space-2, 8px)" }}
          >
            Connexion
          </div>
          <h1
            className="ct-title"
            style={{ margin: 0, marginBottom: "var(--ct-space-1, 4px)" }}
          >
            Gemflow
          </h1>
          <p
            className="ct-sub"
            style={{ margin: 0 }}
          >
            Email et mot de passe requis
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — Cardápio Mix" },
      {
        name: "description",
        content: "Recuperação de senha do Cardápio Mix. Fluxo em preparação para a próxima etapa.",
      },
      { property: "og:title", content: "Recuperar senha — Cardápio Mix" },
      { property: "og:description", content: "Recuperação de senha do Cardápio Mix em preparação." },
    ],
  }),
  component: RecuperarSenha,
});

function RecuperarSenha() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-md text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase">Cardápio Mix</p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">Recuperação de senha</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Esta etapa ainda será configurada. Em breve você poderá redefinir sua senha por e-mail.
        </p>
        <Link
          to="/entrar"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Voltar para o login
        </Link>
      </div>
    </main>
  );
}

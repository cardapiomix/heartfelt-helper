import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/explorar")({
  head: () => ({
    meta: [
      { title: "Explorar sem conta — Cardápio Mix" },
      {
        name: "description",
        content:
          "Área inicial do cliente Cardápio Mix para navegação sem conta. Conteúdo em construção.",
      },
      { property: "og:title", content: "Explorar sem conta — Cardápio Mix" },
      { property: "og:description", content: "Área do cliente Cardápio Mix em construção." },
    ],
  }),
  component: Explorar,
});

function Explorar() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-md text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase">Cardápio Mix</p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">Área do Cliente</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Placeholder do fluxo Cliente (acesso sem conta). Esta área será construída em etapa
          posterior.
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

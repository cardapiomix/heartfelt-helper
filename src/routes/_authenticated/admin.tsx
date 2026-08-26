import { createFileRoute } from "@tanstack/react-router";

import { PainelPlaceholder } from "@/components/auth/PainelPlaceholder";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel Administrativo — Cardápio Mix" },
      { name: "description", content: "Painel Administrativo Cardápio Mix (placeholder)." },
      { property: "og:title", content: "Painel Administrativo — Cardápio Mix" },
      { property: "og:description", content: "Painel Administrativo Cardápio Mix." },
    ],
  }),
  component: () => (
    <PainelPlaceholder
      titulo="Painel Administrativo"
      descricao="Placeholder do Painel Administrativo. Será construído em etapa posterior."
    />
  ),
});

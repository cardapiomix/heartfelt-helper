import { createFileRoute } from "@tanstack/react-router";

import { PainelPlaceholder } from "@/components/auth/PainelPlaceholder";

export const Route = createFileRoute("/_authenticated/comerciante")({
  head: () => ({
    meta: [
      { title: "Painel do Comerciante — Cardápio Mix" },
      { name: "description", content: "Painel do Comerciante Cardápio Mix (placeholder)." },
      { property: "og:title", content: "Painel do Comerciante — Cardápio Mix" },
      { property: "og:description", content: "Painel do Comerciante Cardápio Mix." },
    ],
  }),
  component: () => (
    <PainelPlaceholder
      titulo="Painel do Comerciante"
      descricao="Placeholder do Painel do Comerciante. Será construído em etapa posterior."
    />
  ),
});

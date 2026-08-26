import { createFileRoute } from "@tanstack/react-router";

import { PainelPlaceholder } from "@/components/auth/PainelPlaceholder";

export const Route = createFileRoute("/_authenticated/cliente")({
  head: () => ({
    meta: [
      { title: "Área do Cliente — Cardápio Mix" },
      { name: "description", content: "Área inicial do Cliente Cardápio Mix (placeholder)." },
      { property: "og:title", content: "Área do Cliente — Cardápio Mix" },
      { property: "og:description", content: "Área inicial do Cliente Cardápio Mix." },
    ],
  }),
  component: () => (
    <PainelPlaceholder
      titulo="Área do Cliente"
      descricao="Placeholder do fluxo Cliente. A experiência completa será construída em etapa posterior."
    />
  ),
});

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/entrar", replace: true });
  },
  head: () => ({
    meta: [
      { title: "Cardápio Mix — Entrar" },
      {
        name: "description",
        content: "Cardápio Mix: acesse sua conta para pedir, gerenciar cardápios e administrar.",
      },
      { property: "og:title", content: "Cardápio Mix — Entrar" },
      { property: "og:description", content: "Acesse sua conta Cardápio Mix." },
    ],
  }),
  component: () => null,
});

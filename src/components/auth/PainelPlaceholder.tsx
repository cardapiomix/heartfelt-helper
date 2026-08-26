import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

/**
 * Placeholder mínimo dos painéis por papel, apenas para permitir o teste
 * de ida e volta da sessão (login → painel → logout).
 */
export function PainelPlaceholder({
  titulo,
  descricao,
}: {
  titulo: string;
  descricao: string;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [saindo, setSaindo] = useState(false);

  async function sair() {
    if (saindo) return;
    setSaindo(true);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/entrar", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-md text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase">Cardápio Mix</p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">{titulo}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{descricao}</p>
        <button
          type="button"
          onClick={sair}
          disabled={saindo}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-60"
        >
          {saindo ? "Saindo…" : "Sair da conta"}
        </button>
      </div>
    </main>
  );
}

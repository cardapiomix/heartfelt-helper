import { Apple, Facebook, Mail, Smartphone } from "lucide-react";
import type { ReactNode } from "react";

export type MetodoAuth = {
  id: string;
  rotulo: string;
  icone: ReactNode;
};

/**
 * Métodos previstos no Documento Mestre. Estrutura reutilizável:
 * nas próximas subetapas cada item recebe seu handler real de autenticação.
 */
export const metodosPrevistos: MetodoAuth[] = [
  { id: "google", rotulo: "Continuar com Google", icone: <GoogleIcone /> },
  { id: "apple", rotulo: "Continuar com Apple", icone: <Apple className="size-5" aria-hidden /> },
  { id: "facebook", rotulo: "Continuar com Facebook", icone: <Facebook className="size-5" aria-hidden /> },
  { id: "celular", rotulo: "Entrar com celular", icone: <Smartphone className="size-5" aria-hidden /> },
  { id: "criar-conta", rotulo: "Criar conta com e-mail", icone: <Mail className="size-5" aria-hidden /> },
];

export function BotaoMetodo({
  metodo,
  onSelecionar,
}: {
  metodo: MetodoAuth;
  onSelecionar: (metodo: MetodoAuth) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelecionar(metodo)}
      className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <span className="text-primary">{metodo.icone}</span>
      {metodo.rotulo}
    </button>
  );
}

function GoogleIcone() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M21.35 11.1H12v2.9h5.35c-.25 1.5-1.85 4.4-5.35 4.4a5.4 5.4 0 1 1 0-10.8c1.5 0 2.6.6 3.2 1.15l2.2-2.15A8.3 8.3 0 0 0 12 4a8 8 0 1 0 0 16c4.6 0 7.65-3.25 7.65-7.8 0-.5-.05-.8-.3-1.1Z"
      />
    </svg>
  );
}

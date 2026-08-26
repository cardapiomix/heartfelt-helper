import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type BaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  erro?: string | null;
};

export function CampoTexto({ label, erro, className, ...props }: BaseProps) {
  const id = useId();
  const erroId = `${id}-erro`;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? erroId : undefined}
        className={cn(
          "h-12 rounded-xl border-border bg-secondary/60 text-base text-foreground placeholder:text-muted-foreground",
          erro && "border-destructive",
          className,
        )}
        {...props}
      />
      <MensagemDeErro id={erroId} erro={erro} />
    </div>
  );
}

export function CampoSenha({ label, erro, className, ...props }: BaseProps) {
  const id = useId();
  const erroId = `${id}-erro`;
  const [visivel, setVisivel] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={visivel ? "text" : "password"}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? erroId : undefined}
          className={cn(
            "h-12 rounded-xl border-border bg-secondary/60 pr-14 text-base text-foreground placeholder:text-muted-foreground",
            erro && "border-destructive",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visivel}
          className="absolute inset-y-0 right-0 flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {visivel ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
        </button>
      </div>
      <MensagemDeErro id={erroId} erro={erro} />
    </div>
  );
}

function MensagemDeErro({ id, erro }: { id: string; erro?: string | null }) {
  return (
    <p id={id} aria-live="polite" className="min-h-5 text-sm font-medium text-destructive">
      {erro ? <span>⚠ {erro}</span> : null}
    </p>
  );
}

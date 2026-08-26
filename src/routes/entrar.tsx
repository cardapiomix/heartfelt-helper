import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { CampoSenha, CampoTexto } from "@/components/auth/CampoTexto";
import { BotaoMetodo, metodosPrevistos, type MetodoAuth } from "@/components/auth/MetodosFuturos";
import { supabase } from "@/integrations/supabase/client";
import { emailValido, mensagemDeErroDeLogin } from "@/lib/auth-messages";
import { obterPapelDoUsuario, rotaPorPapel } from "@/lib/user-role";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — Cardápio Mix" },
      {
        name: "description",
        content:
          "Acesse sua conta Cardápio Mix com e-mail e senha para continuar seus pedidos e gerenciar seu cardápio.",
      },
      { property: "og:title", content: "Entrar — Cardápio Mix" },
      {
        property: "og:description",
        content: "Acesse sua conta Cardápio Mix com e-mail e senha para continuar.",
      },
    ],
  }),
  component: PaginaEntrar,
});

function PaginaEntrar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState<string | null>(null);
  const [erroSenha, setErroSenha] = useState<string | null>(null);
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [status, setStatus] = useState<"padrao" | "enviando" | "sucesso">("padrao");

  const formularioValido = emailValido(email) && senha.length >= 6;
  const enviando = status === "enviando";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    const emailOk = emailValido(email);
    const senhaOk = senha.length >= 6;
    setErroEmail(emailOk ? null : "Informe um e-mail válido.");
    setErroSenha(senhaOk ? null : "A senha deve ter pelo menos 6 caracteres.");
    setErroGeral(null);
    if (!emailOk || !senhaOk) return;

    setStatus("enviando");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: senha,
      });

      if (error || !data.user) {
        setStatus("padrao");
        setErroGeral(mensagemDeErroDeLogin(error));
        return;
      }

      setStatus("sucesso");
      const papel = await obterPapelDoUsuario(data.user.id);
      toast.success("Bem-vindo de volta ao Cardápio Mix.");
      navigate({ to: rotaPorPapel[papel], replace: true });
    } catch (error) {
      setStatus("padrao");
      setErroGeral(mensagemDeErroDeLogin(error));
    }
  }

  function metodoFuturo(metodo: MetodoAuth) {
    toast(`${metodo.rotulo} será configurado na próxima etapa.`);
  }

  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <section className="hidden flex-col justify-between border-r border-border bg-secondary/30 p-12 lg:flex">
        <p className="text-sm tracking-[0.35em] text-primary uppercase">Cardápio Mix</p>
        <div className="max-w-md space-y-4">
          <p className="text-3xl leading-snug font-light text-foreground">
            Sabores selecionados, pedidos simples e um cardápio que valoriza cada prato.
          </p>
          <p className="text-sm text-muted-foreground">
            Clientes, comerciantes e administradores em uma única experiência.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Experiência premium em gastronomia.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-xs tracking-[0.25em] text-primary uppercase">
              Cardápio Mix
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Bem-vindo ao Cardápio Mix
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Entre para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <CampoTexto
              label="E-mail"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="voce@email.com"
              value={email}
              erro={erroEmail}
              disabled={enviando}
              onChange={(e) => {
                setEmail(e.target.value);
                if (erroEmail) setErroEmail(null);
              }}
            />

            <CampoSenha
              label="Senha"
              autoComplete="current-password"
              placeholder="Sua senha"
              value={senha}
              erro={erroSenha}
              disabled={enviando}
              onChange={(e) => {
                setSenha(e.target.value);
                if (erroSenha) setErroSenha(null);
              }}
            />

            <p aria-live="assertive" role="status" className="min-h-5 text-sm font-medium">
              {erroGeral ? (
                <span className="text-destructive">⚠ {erroGeral}</span>
              ) : status === "sucesso" ? (
                <span className="text-primary">Acesso liberado. Redirecionando…</span>
              ) : null}
            </p>

            <button
              type="submit"
              disabled={!formularioValido || enviando}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enviando ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden />
                  Entrando…
                </>
              ) : (
                "Entrar"
              )}
            </button>

            <div className="text-center lg:text-right">
              <Link
                to="/recuperar-senha"
                className="rounded text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Esqueci minha senha
              </Link>
            </div>
          </form>

          <div className="my-7 flex items-center gap-4" aria-hidden>
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            {metodosPrevistos.map((metodo) => (
              <BotaoMetodo key={metodo.id} metodo={metodo} onSelecionar={metodoFuturo} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/explorar"
              className="rounded text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Continuar sem conta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

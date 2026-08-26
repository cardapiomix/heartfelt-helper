/**
 * Traduz mensagens técnicas de autenticação em mensagens amigáveis em português.
 * Nunca expor stack trace, códigos internos ou detalhes técnicos ao usuário.
 */
export function mensagemDeErroDeLogin(error: unknown): string {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return "Você parece estar sem conexão. Verifique sua internet e tente novamente.";
  }

  const raw =
    error && typeof error === "object" && "message" in error
      ? String((error as { message?: unknown }).message ?? "")
      : "";
  const msg = raw.toLowerCase();

  if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (msg.includes("email not confirmed")) {
    return "Confirme seu e-mail para continuar.";
  }
  if (msg.includes("too many requests") || msg.includes("rate limit")) {
    return "Muitas tentativas. Aguarde alguns instantes e tente novamente.";
  }
  if (msg.includes("failed to fetch") || msg.includes("network") || msg.includes("timeout")) {
    return "Não conseguimos falar com o servidor. Verifique sua conexão e tente novamente.";
  }
  if (msg.includes("user not found")) {
    return "E-mail ou senha incorretos.";
  }

  return "Não foi possível entrar agora. Tente novamente em instantes.";
}

export function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

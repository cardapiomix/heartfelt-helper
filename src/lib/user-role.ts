import { supabase } from "@/integrations/supabase/client";

export type AppRole = "customer" | "merchant" | "admin";

export const rotaPorPapel: Record<AppRole, string> = {
  customer: "/cliente",
  merchant: "/comerciante",
  admin: "/admin",
};

/**
 * Lê o papel do usuário autenticado em public.profiles.
 * Nunca permite escolha manual de papel: a conta define o perfil.
 * Se o perfil não estiver disponível, assume o fluxo Cliente.
 */
export async function obterPapelDoUsuario(userId: string): Promise<AppRole> {
  const { data, error } = await supabase
    .from("profiles" as never)
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return "customer";

  const role = (data as { role?: string }).role;
  if (role === "merchant" || role === "admin" || role === "customer") return role;
  return "customer";
}

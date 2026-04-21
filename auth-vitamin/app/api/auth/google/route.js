import { supabase } from "../../../../lib/supabase";

export async function GET(request) {
  const result = await supabase.auth.signInWithOAuth({ provider: "google" });

  if (result.error || !result.data?.url) {
    return Response.json(result, { status: 400 });
  }

  return Response.redirect(result.data.url);
}

import { supabase } from "../../../../lib/supabase";

export async function POST(request) {
  const result = await supabase.auth.signOut();

  return Response.json(result);
}

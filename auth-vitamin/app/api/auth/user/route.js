import { supabase } from "../../../../lib/supabase";

export async function GET(request) {
  const result = await supabase.auth.getUser();

  return Response.json(result);
}

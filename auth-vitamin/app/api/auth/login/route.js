import { supabase } from "../../../../lib/supabase";

export async function POST(request) {
  const { email, password } = await request.json();
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return Response.json(result);
}

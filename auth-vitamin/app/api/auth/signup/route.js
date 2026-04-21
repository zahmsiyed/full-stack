import { supabase } from "../../../../lib/supabase";

export async function POST(request) {
  const { email, password } = await request.json();
  const result = await supabase.auth.signUp({ email, password });

  if (result.error) {
    return Response.json(result, { status: 400 });
  }

  return Response.json(result, { status: 201 });
}

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "YOU ARE LOGGED IN", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "something went very wrong. join me in prayer as it is the Lord's will" }, { status: 500 });
  }
}
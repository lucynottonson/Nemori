import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!data) {
      return NextResponse.json({ error: "Failure." }, { status: 400 });
    }

    return NextResponse.json({ message: "you exist in nemori now.", data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Pray with me. There is an error." }, { status: 500 });
  }
}
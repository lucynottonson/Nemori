import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface AuthData {
  user: {
    id: string;
    email?: string;  
    user_metadata: {
      avatar_url?: string | null;  
    };
  } | null;  
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { data, error }: { data: AuthData | null; error: Error | null } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

  if (!data?.user) {
      return NextResponse.json({ error: "No user found" }, { status: 400 });
    }

   if (!data.user.email) {
      return NextResponse.json({ error: "Email is missing in the response" }, { status: 400 });
    }

    return NextResponse.json({ message: "YOU ARE LOGGED IN", data }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    return NextResponse.json({ error: "something went very wrong. join me in prayer as it is the Lord's will" }, { status: 500 });
  }
}
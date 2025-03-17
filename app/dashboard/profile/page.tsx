"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/auth-js"; // Import the Supabase User type

interface User extends SupabaseUser {
  user_metadata: {
    avatar_url: string | null;
  };
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching user session:", error.message);
        return;
      }

      if (data?.session?.user) {
        setUser(data.session.user as User); // Cast the user to the extended User type
        setAvatarUrl(data.session.user?.user_metadata?.avatar_url || null);
      }
    };

    fetchUser();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}.${fileExt}`;
      const filePath = `profile-pictures/${fileName}`;

      await supabase.storage.from("profile-pictures").remove([filePath]);

      const { error } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, file, { upsert: true });

      if (error) throw new Error("UH OH.: " + error.message);

      const { data: publicUrlData } = supabase.storage.from("profile-pictures").getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      if (!publicUrl) throw new Error("Could not get public URL. sorry.");

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateError) throw new Error("FAILURE. did not upload here is why: " + updateError.message);

      setAvatarUrl(publicUrl);
    } catch (error) {
      console.error("didn't upload image. hope this helps:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-semibold">Profile Page</h1>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Profile" className="w-24 h-24 rounded-full mx-auto my-4" />
      ) : (
        <p>No profile picture</p>
      )}
      <input type="file" onChange={handleUpload} accept="image/*" />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
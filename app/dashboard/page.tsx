import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(); // No need to import authOptions

  if (!session) {
    redirect("/login");
  }

  return <h1>Welcome to the Dashboard, {session.user?.name}!</h1>;
}
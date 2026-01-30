import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Painel de Administração</h1>
      <p className="mt-4">Bem-vinda, {session.user?.email}</p>
    </div>
  );
}

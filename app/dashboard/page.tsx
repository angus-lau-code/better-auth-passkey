import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignoutButton } from "./signout-button";
import { PasskeyRegistrationDialog } from "./passkey-dialog";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/");
  }

  const user = session.user;

  return (
    <div className="flex flex-col gap-6 px-8 py-4 max-w-3xl items-center">
      <div className="flex flex-col gap-6">
        <h1>Dashboard for {user.email}</h1>
        <SignoutButton />
        <PasskeyRegistrationDialog />
      </div>
    </div>
  );
}

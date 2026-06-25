import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@/lib/definitions";

export default async function ScreenRedirection() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user as unknown as User;
  const role = user.role?.name;

  if (role) {
    redirect(`/${role}/dashboard`);
  } else {
    redirect("/login");
  }

}
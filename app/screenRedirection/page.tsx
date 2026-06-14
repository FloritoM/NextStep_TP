import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { User } from "@/app/lib/definitions";

export default async function ScreenRedirection() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user as unknown as User;
  const role = user.role?.name;

  if (role === "recruiter") {
    redirect("/recruiter/dashboard");
  } else if (role === "applicant") {
    redirect("/home");
  } else if (role === "admin") {
    redirect("/adminDashboard");
  } else {
    redirect("/home");
  }
}
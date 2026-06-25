import MyApplications from "@/components/applicant/MyApplications";
import { auth } from "@/auth";

export default async function ApplicationsPage() {
  const session = await auth();
  const token = session?.accessToken as string;

  return <MyApplications token={token} />;
}
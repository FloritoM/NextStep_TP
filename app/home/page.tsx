import { redirect } from "next/navigation";
import { auth } from "../../auth";
import HomeContent from "../ui/home-content";
import { User } from "../lib/definitions";

async function getJobOffers() {
  const res = await fetch(`${process.env.BACKEND_URL}/job-offers`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }
    const user = session.user as unknown as User;
    const token = session.accessToken;
    const jobOffers = await getJobOffers();
    return <HomeContent user={user} token={token} initialJobs={jobOffers} />;
}
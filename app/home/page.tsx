import { auth } from "../../auth";
import HomeContent from "../ui/home-content";

async function getJobOffers() {
  const res = await fetch(`${process.env.BACKEND_URL}/job-offers`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
    const session = await auth(); 
    const user = session?.user;
    const token = session?.accessToken
    const jobOffers = await getJobOffers();
    return <HomeContent user={user} token={token} initialJobs={jobOffers} />;
}
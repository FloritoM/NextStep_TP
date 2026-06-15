import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import HomeContent from "../../../ui/home-content";
import { User } from "../../../lib/definitions";
import Navbar from "@/app/ui/Navbar";

async function getJobOffers(token: string | undefined) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job-offers`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    if (!res.ok) {
      console.error("Error trayendo vacantes:", res.status, await res.text());
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error de conexión con el backend:", error);
    return [];
  }
}

async function getSeniorities(token: string | undefined) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seniority`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error trayendo seniorities:", error);
    return [];
  }
}

export default async function Home() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }
    const user = session.user as unknown as User;
    const token = session.accessToken;
    
    const jobOffers = await getJobOffers(token);
    const seniorities = await getSeniorities(token); 

    return (
      <>
        <Navbar />
        <HomeContent user={user} token={token} initialJobs={jobOffers} seniorities={seniorities} />
      </>
    );
}
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import HomeContent from "@/components/applicant/home-content";
import { User } from "@/lib/definitions";
import { getSeniorities } from "@/lib/services/seniorities.service";
import { getJobOffers } from "@/lib/services/jobOffers.service";

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
        <HomeContent user={user} token={token} initialJobs={jobOffers} seniorities={seniorities} />
    );
}
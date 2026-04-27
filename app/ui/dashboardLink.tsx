import { redirect } from "next/navigation"
import { Button } from "./button";
import { auth } from "@/auth"

export default function DashboardLink() {
    return (
        <form
            action={async () => {
                'use server';
                const session = await auth();
                const role = session?.user?.role;

                if (role === 'admin') redirect('/adminDashboard');
                else if (role === 'applicant') redirect('/userDashboard');
                else if (role === 'recruiter') redirect('/recruiterDashboard');
                else redirect('/login');
            }}
        >
            <Button className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Iniciar sesion"} />
        </form>
    )
        
}
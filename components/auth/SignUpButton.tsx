import { redirect } from "next/navigation"
import { Button } from "@/app/ui/button";

export default function SignUpButton() {
    return (
        <form
            action={async () => {
                'use server';
                redirect('/register');
            }}
        >
            <Button className="cursor-pointer border-none bg-main rounded-lg text-xl text-white font-semibold hover:bg-yellow-400" buttonText={"Registrarse"} />
        </form>
    )
}
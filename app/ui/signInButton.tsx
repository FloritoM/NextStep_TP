import { redirect } from "next/navigation"
import { Button } from "./button";

export default function SignInButton() {
    return (
        <form
            action={async () => {
                'use server';
                redirect('/login' );
            }}
        >
            <Button className="cursor-pointer border-none bg-yellow-400 rounded-lg active:bg-blue-600 text-xl text-black font-semibold hover:bg-amber-600" buttonText={"Iniciar sesión"} />
        </form>
    )
}
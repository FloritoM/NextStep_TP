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
            <Button className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Iniciar sesion"} />
        </form>
    )
        
}
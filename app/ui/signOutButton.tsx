import { signOut } from "@/auth"
import { Button } from "./button";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >
            <Button className="cursor-pointer border-none bg-yellow-400 rounded-lg text-xl text-black font-semibold hover:bg-amber-600 flex flex-row items-center"
                buttonText="Cerrar sesion" iconFont={faArrowRightFromBracket} iconClass="text-black pl-4" />
        </form>
    )
}
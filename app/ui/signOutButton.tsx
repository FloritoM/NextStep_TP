import { signOut } from "@/auth"
import { Button } from "./button";
import { handleSignOut } from "../lib/actions";

export default function SignOutButton() {
    return (
        <form
            action={handleSignOut}
        >
            <Button className="cursor-pointer border-none bg-yellow-400 rounded-lg text-xl text-black font-semibold hover:bg-amber-600 flex flex-row items-center"
                buttonText="Cerrar sesion"  />
        </form>
    )
}
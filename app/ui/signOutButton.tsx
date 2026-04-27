import { signOut } from "@/auth"
import { Button} from "./button";


export default function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >
            <Button className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" buttonText={"Cerrar sesion"} />
        </form>
    )
}
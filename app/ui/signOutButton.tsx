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
            <Button className="cursor-pointer border-none bg-yellow-400 rounded-lg active:bg-blue-600 text-xl text-gray-500 font-semibold hover:text-gray-950" 
            buttonText="Cerrar sesion"/>
        </form>
    )
}
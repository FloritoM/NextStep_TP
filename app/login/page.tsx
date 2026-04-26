import { Suspense } from "react";
import Login from "../ui/loginForm";

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Login />
        </Suspense>
    )
}


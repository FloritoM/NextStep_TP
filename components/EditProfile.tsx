"use client";

import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser, faLock, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { User } from "@/app/lib/definitions";

export default function EditProfile() {
    const [user, setUser] = useState<User>();
    const [editForm, setEditForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

    useEffect(() => {
    async function loadUser() {
        const res = await fetch(`${process.env.BACKEND_URL}/users/id`);
        const data = await res.json();
        setUser(data);
        setEditForm({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: ""
        });
    }
    loadUser();
}, []);


    const [isEditing, setIsEditing] = useState(false);
    // const [firstName, setFirstName] = useState("Nahuel");
    // const [lastName, setLastName] = useState("Raimondi");
    // const [email, setEmail] = useState("nahuel@nextstep.com");
    // const [password, setPassword] = useState("123456");
    const [passErrorMsg, setPassErrorMsg] = useState("");
    const [validPass, setValidPass] = useState(true)

    const initials = `${user?.firstName[0] ?? ""}${user?.lastName[0] ?? ""}`.toUpperCase();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isEditing) {
            const res = await fetch(`${process.env.BACKEND_URL}/users/id`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });

            const updated = await res.json();
            setUser(updated); 
        }

        setIsEditing(!isEditing);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newPassword = e.target.value;
        

        if (newPassword.length < 4) {
            setPassErrorMsg("La contraseña debe tener mínimo 4 caracteres")
            setValidPass(false)
        } else {
            setPassErrorMsg("")
            setValidPass(true)
            setEditForm(prev => ({ ...prev, password: e.target.value }))
        }

        
    }

    return (
        <div className="flex-1 bg-main overflow-auto">
            <form onSubmit={handleSubmit}>
                <div className="profile-grid max-w-7xl mx-auto mt-32">
                    <div className="first justify-start py-6">
                        <h1 className="text-[1.75rem] text-gray-50 font-bold">Mi perfil</h1>
                        <p className="text-gray-50">Gestiona tu informacion personal y de acceso</p>
                    </div>

                    <div className="second flex justify-end">
                        <div>
                            <button
                                type="submit"
                                className="cursor-pointer border-none bg-yellow-400 rounded-lg text-xl text-black font-semibold hover:bg-amber-600 p-4"
                            >
                                <FontAwesomeIcon icon={isEditing ? faFloppyDisk : faPenToSquare} className="text-black" />
                                {isEditing ? " Guardar" : " Editar Perfil"}
                            </button>
                        </div>
                    </div>

                    <div className="third rounded-xl border border-gray-700 bg-gray-800/50 p-5 flex flex-col items-center">
                        <div className="border border-white rounded-full mb-2">
                            <p className="text-amber-600 font-bold text-[4.375rem] p-5 select-none">{initials}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xl text-gray-50 font-bold">{user?.firstName} {user?.lastName}</p>
                            <p className="text-gray-50">{user?.email}</p>
                        </div>
                    </div>

                    <div className="fourth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p className="pb-5 pt-1 text-[1.375rem]">
                            <FontAwesomeIcon icon={faUser} className="text-amber-600" /> Informacion personal
                        </p>
                        <div className="section gap-5">
                            <div className="sub-section">
                                <label className="text-white font-semibold">Nombre</label>
                                {isEditing
                                    ? <input className="bg-gray-700 text-white rounded" value={user?.firstName} onChange={e => setEditForm(prev => ({ ...prev, firstName: e.target.value }))} />
                                    : <p className="text-white">{user?.firstName}</p>
                                }
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Apellido</label>
                                {isEditing
                                    ? <input className="bg-gray-700 text-white rounded" value={user?.lastName} onChange={e => setEditForm(prev => ({ ...prev, lastName: e.target.value }))} />
                                    : <p className="text-white">{user?.lastName}</p>
                                }
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Rol</label>
                                <p className="text-white">Candidato</p>
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Creacion de cuenta</label>
                                <p className="text-white">03/05/2025</p>
                            </div>
                        </div>
                    </div>

                    <div className="fifth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p className="pb-5 pt-1 text-[1.375rem]">
                            <FontAwesomeIcon icon={faLock} className="text-amber-600" /> Informacion de acceso
                        </p>
                        <div className="section gap-5">
                            <div className="sub-section">
                                <label className="text-white font-semibold">Email</label>
                                {isEditing
                                    ? <input className="bg-gray-700 text-white rounded" value={user?.email} onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))} />
                                    : <p className="text-white">{user?.email}</p>
                                }
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Contraseña</label>
                                {isEditing
                                    ? <input
                                        id="password"
                                        type="password"
                                        className="bg-gray-700 text-white rounded"
                                        value={user?.password ?? ""}
                                        onChange={handlePasswordChange}
                                    />
                                    : <p className="text-white">••••••••</p>
                                }
                                {!validPass && <p className="text-white text-sm">{passErrorMsg}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
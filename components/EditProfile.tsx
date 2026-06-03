"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export default function EditProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("Nahuel");
    const [lastName, setLastName] = useState("Raimondi");
    const [role, setRole] = useState("Candidato");
    const [email, setEmail] = useState("nahuel@nextstep.com");
    const [createdAt, setCreatedAt] = useState("20/03/2026");

    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

    return (
        <div className="flex-1 bg-main overflow-auto">
            <form onSubmit={e => { e.preventDefault(); setIsEditing(!isEditing); }}>
                <div className="profile-grid max-w-7xl mx-auto mt-32">
                    <div className="first justify-start py-6">
                        <h1 className="text-[1.75rem] text-gray-50 font-bold">Mi perfil</h1>
                        <p className="text-gray-50">Gestiona tu informacion personal y de acceso</p>
                    </div>

                    <div className="second flex justify-end">
                        <button
                            type="submit"
                            className="cursor-pointer border-none bg-yellow-400 rounded-lg text-xl text-black font-semibold hover:bg-amber-600"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} className="text-black" />
                            {isEditing ? " Guardar" : " Editar Perfil"}
                        </button>
                    </div>

                    <div className="third rounded-xl border border-gray-700 bg-gray-800/50 p-5 flex flex-col items-center">
                        <div className="border border-white rounded-full mb-2">
                            <p className="text-amber-600 font-bold text-[4.375rem] p-5">{initials}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xl text-gray-50 font-bold">{firstName} {lastName}</p>
                            <p className="text-gray-50">{email}</p>
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
                                    ? <input className="bg-gray-700 text-black rounded px-2 py-1" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    : <p className="text-white">{firstName}</p>
                                }
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Apellido</label>
                                {isEditing
                                    ? <input className="bg-gray-700 text-white rounded px-2 py-1" value={lastName} onChange={e => setLastName(e.target.value)} />
                                    : <p className="text-white">{lastName}</p>
                                }
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Rol</label>
                                {isEditing
                                    ? <input className="text-white bg-gray-700" value={role} onChange={e => { setRole(e.target.value) }} />
                                    : <p className="text-white">{role}</p>
                                }
                            </div> 
                            <div className="sub-section">
                                <label className="text-white font-semibold">Creacion de cuenta</label>
                                 {isEditing
                                    ? <input className="text-white bg-gray-700" value={createdAt} onChange={e => { setCreatedAt(e.target.value) }} />
                                    : <p className="text-white">{createdAt}</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="fifth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p className="pb-5 pt-1 text-[1.375rem]">
                            <FontAwesomeIcon icon={faLock} className="text-amber-600" /> Informacion de acceso
                        </p>
                        <div className="section gap-5">
                            <div className="sub-section">
                                <p className="text-white font-semibold">Email</p>
                                {isEditing
                                    ? <input className="bg-gray-700 text-white rounded px-2 py-1" value={email} onChange={e => setEmail(e.target.value)} />
                                    : <p className="text-white">{email}</p>
                                }
                            </div>
                            <div className="sub-section">
                                <p className="text-white font-semibold">Contraseña</p>
                                <p className="text-white">*********</p>
                            </div>
                        </div>
                    </div></div>
            </form>
        </div>
    );
}
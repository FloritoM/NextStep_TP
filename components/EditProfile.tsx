"use client";

import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser, faLock, faFloppyDisk, faBan } from "@fortawesome/free-solid-svg-icons";
import { EyeIcon, EyeOffIcon } from '@/app/ui/passwordIcons'
import { User } from "@/app/lib/definitions";

export default function EditProfile({ userId, token }: { userId: string, token: string }) {
    const [user, setUser] = useState<User>();
    const [editForm, setEditForm] = useState({ firstName: "", lastName: "", email: "", password: "", role: "", createdAt: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<{ firstName?: string; lastName?: string; email?: string }>({});

    function validateForm() {
        const newErrors: { firstName?: string; lastName?: string; email?: string } = {};

        if (!editForm.firstName.trim()) {
            newErrors.firstName = "El nombre es requerido";
        } else if (editForm.firstName.trim().length < 2) {
            newErrors.firstName = "El nombre debe tener al menos 2 caracteres";
        } else if (editForm.firstName.trim().length > 50) {
            newErrors.firstName = "El nombre es demasiado largo";
        }

        if (!editForm.lastName.trim()) {
            newErrors.lastName = "El apellido es requerido";
        } else if (editForm.lastName.trim().length < 2) {
            newErrors.lastName = "El apellido debe tener al menos 2 caracteres";
        } else if (editForm.lastName.trim().length > 50) {
            newErrors.lastName = "El apellido es demasiado largo";
        }

        if (!editForm.email.trim()) {
            newErrors.email = "El email es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
            newErrors.email = "El email no es válido";
        } else if (editForm.email.length > 50) {
            newErrors.email = "El email es demasiado largo";
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        async function loadUser() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setUser(data);
            setEditForm({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role.name,
                createdAt: new Date(data.createdAt).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                password: ""
            });
        }
        loadUser();
    }, [userId]);

    const [isEditing, setIsEditing] = useState(false);
    const [passErrorMsg, setPassErrorMsg] = useState("");
    const [validPass, setValidPass] = useState(true)

    const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

    const [emailError, setEmailError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (isEditing) {
            if (!validateForm()) return;

            setEmailError("");

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    firstName: editForm.firstName,
                    lastName: editForm.lastName,
                    email: editForm.email,
                    password: editForm.password || undefined
                })
            });

            if (!res.ok) {
                if (res.status === 409) {
                    setEmailError("Ese email ya está en uso por otro usuario");
                } else {
                    setEmailError("Ocurrió un error al actualizar el perfil");
                }
                return;
            }

            const updated = await res.json();
            setUser(updated);
        }

        setIsEditing(!isEditing);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newPassword = e.target.value;
        setEditForm(prev => ({ ...prev, password: newPassword }));

        if (newPassword.length > 0 && newPassword.length < 4) {
            setPassErrorMsg("La contraseña debe tener mínimo 4 caracteres");
            setValidPass(false);
        } else {
            setPassErrorMsg("");
            setValidPass(true);
        }
    }

    return (
        <div className="flex-1 bg-main overflow-auto">
            <form onSubmit={handleSubmit}>
                <div className="profile-grid max-w-7xl mx-auto mt-32">
                    <div className="first justify-start py-6">
                        <h1 className="text-[1.75rem] text-gray-50 font-bold">Mi perfil</h1>
                        <p className="text-gray-50">Gestioná tu información personal y de acceso</p>
                    </div>

                    <div className="second flex justify-end">
                        <div className="pr-10">
                            {isEditing ? <button
                                className="cursor-pointer border-none bg-yellow-400 rounded-lg text-xl text-black font-semibold hover:bg-amber-600 p-4"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEmailError("");
                                    setFormErrors({});
                                    setEditForm({
                                        firstName: user?.firstName ?? "",
                                        lastName: user?.lastName ?? "",
                                        email: user?.email ?? "",
                                        role: user?.role.name ?? "",
                                        createdAt: editForm.createdAt,
                                        password: ""
                                    });
                                }}>
                                <FontAwesomeIcon icon={faBan} className="text-black pr-1" />
                                Cancelar</button> : null}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="cursor-pointer border-none bg-yellow-400 rounded-lg text-xl text-black font-semibold hover:bg-amber-600 p-4"
                            >
                                <FontAwesomeIcon icon={isEditing ? faFloppyDisk : faPenToSquare} />

                                {isEditing ? " Guardar" : " Editar Perfil"}
                            </button>
                        </div>
                    </div>

                    <div className="third rounded-xl border border-gray-700 bg-gray-800/50 p-5 flex flex-col items-center">
                        <div className="border border-white rounded-full mb-2 w-32 h-32 flex items-center justify-center">
                            <p className="text-amber-600 font-bold text-[3.5rem] select-none">{initials}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xl text-gray-50 font-bold">{user?.firstName} {user?.lastName}</p>
                            <p className="text-gray-50">{user?.email}</p>
                        </div>
                    </div>

                    <div className="fourth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p className="pb-5 pt-1 text-[1.375rem]">
                            <FontAwesomeIcon icon={faUser} className="text-amber-600" /> Información personal
                        </p>
                        <div className="section gap-5">
                            <div className="sub-section">
                                <label className="text-white font-semibold">Nombre</label>
                                {isEditing
                                    ? <input className="bg-gray-700 text-white rounded pl-2" value={editForm.firstName} onChange={e => setEditForm(prev => ({ ...prev, firstName: e.target.value }))} />
                                    : <p className="text-white">{user?.firstName}</p>
                                }
                                {formErrors.firstName && <p className="text-red-400 text-sm">{formErrors.firstName}</p>}
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Apellido</label>
                                {isEditing
                                    ? <input className="bg-gray-700 text-white rounded pl-2" value={editForm.lastName} onChange={e => setEditForm(prev => ({ ...prev, lastName: e.target.value }))} />
                                    : <p className="text-white">{user?.lastName}</p>
                                }
                                {formErrors.lastName && <p className="text-red-400 text-sm">{formErrors.lastName}</p>}
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Rol</label>
                                <p className="text-white">{editForm.role}</p>
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Creacion de cuenta</label>
                                <p className="text-white">{editForm.createdAt}</p>
                            </div>
                        </div>
                    </div>

                    <div className="fifth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p className="pb-5 pt-1 text-[1.375rem]">
                            <FontAwesomeIcon icon={faLock} className="text-amber-600" /> Información de acceso
                        </p>
                        <div className="section gap-5">
                            <div className="sub-section">
                                <label className="text-white font-semibold">Email</label>
                                {isEditing
                                    ? <input className="bg-gray-700 text-white rounded pl-2" value={editForm.email} onChange={e => { setEditForm(prev => ({ ...prev, email: e.target.value })); setEmailError(""); }} />
                                    : <p className="text-white">{user?.email}</p>
                                }
                                {formErrors.email && <p className="text-red-400 text-sm">{formErrors.email}</p>}
                                {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
                            </div>
                            <div className="sub-section">
                                <label className="text-white font-semibold">Contraseña</label>
                                {isEditing
                                    ? <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className="bg-gray-700 text-white rounded pl-2 pr-10 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                                            value={editForm.password}
                                            onChange={handlePasswordChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                                        >
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                    : <p className="text-white pl-2">••••••••</p>
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
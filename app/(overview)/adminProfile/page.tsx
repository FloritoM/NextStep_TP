import Header from "@/app/ui/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faUser, faLock } from '@fortawesome/free-solid-svg-icons'

export default async function AdminProfile() {
    return (
        <>
            <Header />
            <div className="h-full bg-main overflow-auto">
                <div className="profile-grid w-7xl mx-auto mt-32">
                    <div className="first justify-start py-6">
                        <h1 className="text-[28px] text-gray-50 font-bold">Mi perfil</h1>
                        <p className="text-gray-50">Gestiona tu informacion personal y de acceso</p>
                    </div>
                    <div className="second flex justify-end">
                        <div>
                            <button className="cursor-pointer border-none bg-yellow-400 rounded-lg active:bg-blue-600 text-xl text-black font-semibold hover:bg-amber-600 p-4 mt-4">
                                <FontAwesomeIcon icon={faPenToSquare} className="text-black" /> Editar Perfil</button></div>
                    </div>

                    <div className="third rounded-xl border border-gray-700 bg-gray-800/50 p-5 flex flex-col items-center">
                        <div className="border border-white rounded-full mb-2">
                            <p className="text-amber-600 font-bold text-[70px] p-5">NR</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xl text-gray-50 font-bold">Nahuel Raimondi</p>
                            <p className="text-gray-50">nahuel@nextstep.com</p>
                        </div>
                    </div>
                    <div className="fourth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p className="pb-5 pt-1 text-[22px]"><FontAwesomeIcon icon={faUser} className="text-amber-600" /> Informacion personal</p>
                        <div>
                            <div className="section gap-5">
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Nombre</p>
                                    <p className="text-white">Nahuel</p>
                                </div>
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Apellido</p>
                                    <p className="text-white">Raimondi</p>
                                </div>
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Rol</p>
                                    <p className="text-white">Candidato</p>
                                </div>
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Creacion de cuenta</p>
                                    <p className="text-white">21/05/2026</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fifth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p className="pb-5 pt-1 text-[22px]"><FontAwesomeIcon icon={faLock} className="text-amber-600" /> Informacion de acceso</p>
                        <div>
                            <div className="section gap-5">
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Email</p>
                                    <p className="text-white">nahuel@nextstep.com</p>
                                </div>
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Contraseña</p>
                                    <p className="text-white">*********</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
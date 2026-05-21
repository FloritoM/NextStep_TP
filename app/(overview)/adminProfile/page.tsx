import Header from "@/app/ui/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faUser, faLock } from '@fortawesome/free-solid-svg-icons'

export default async function AdminProfile() {
    return (
        <>
            <Header />
            <div className="h-full bg-main">
                <div className="profile-grid">
                    <div className="first justify-center p-6">
                        <h1 className="text-xl text-gray-50 font-bold">MI PERFIL</h1>
                        <p className="text-gray-50">Gestiona tu informacion personal y de acceso</p>
                    </div>
                    <div className="second flex justify-center p-6">
                        <button className="cursor-pointer border-none bg-yellow-400 rounded-lg active:bg-blue-600 text-xl text-gray-500 font-semibold hover:text-gray-950 p-3">
                            <FontAwesomeIcon icon={faPenToSquare} className="text-black" /> Editar Perfil</button>
                    </div>

                    <div className="third rounded-xl border border-gray-700 bg-gray-800/50 p-5">
                        <p className="text-xl text-gray-50 font-bold">Nahuel Raimondi</p>
                        <p className="text-gray-50">nahuel@nextstep.com</p>
                    </div>
                    <div className="fourth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p><FontAwesomeIcon icon={faUser}/> Informacion personal</p>
                        <div>
                            <div className="section gap-5">
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Nombre</p>
                                    <p className="text-white">nahuel@nextstep.com</p>
                                </div>
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Apellido</p>
                                    <p className="text-white">Raimondi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fifth rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-white">
                        <p><FontAwesomeIcon icon={faLock}/> Informacion de acceso</p>
                        <div>
                            <div className="section gap-5">
                                <div className="sub-section ">
                                    <p className="text-white font-semibold">Email</p>
                                    <p className="text-white">nahuel@nextstep.com</p>
                                </div>
                                <div className="sub-section">
                                    <p className="text-white font-semibold">Contraseña</p>
                                    <p className="text-white">*********</p>

                                    <button className=" ml-auto cursor-pointer border-none bg-yellow-400 rounded-lg active:bg-blue-600 text-xl text-gray-500 font-semibold hover:text-gray-950 p-3">
                                        <FontAwesomeIcon icon={faPenToSquare} className="text-black" /> Editar Contraseña</button>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </>
    )
}
import SignInButton from "./ui/signInButton";
import SignUpButton from "./ui/SignUpButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import { pacifico } from "./ui/fonts";

export default function Home() {
  return (
    <div className="">
      <section id="inicio" className="bg-main">
        <header className="sticky top-0 w-full">
          <div className="bg-[url('/landing-header.png')] bg-cover">
            <h1 className="text-center text-[4rem] text-black font-bold py-4 select-none">Next<span className={`${pacifico.className} italic text-amber-600 font-semibold select-none`}>Step</span></h1>
            <p className="px-17 text-black font-semibold text-[1.5rem] text-center select-none">Simplificamos los procesos de selección</p>
            <p className="px-17 pb-3 text-black font-semibold text-[1.5rem] text-center select-none">Mejor experiencia para recruiters y candidatos</p>
          </div>
          <div className=" flex justify-center pb-5">
            <nav className="w-[100%]">
              <ul className="flex justify-center gap-15 text-white text-[1.5rem] bg-gray-700 py-3">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <div>
          <p className="px-17 pt-5 pb-10 text-white font-semibold text-[2rem]">¿Que ofrecemos?</p>
          <div className="flex justify-evenly">
            <div className="flex items-center border border-gray-700 w-[45%] rounded-xl bg-gray-700">
              <FontAwesomeIcon icon={faUserTie} className="text-amber-600 text-[3rem] pl-4" />
              <p className="px-8 py-3 text-white text-[1.3rem]"><span className="font-semibold text-amber-600">Recruiter:</span> puede publicar una búsqueda laboral, reciba postulantes y
                cargue feedback estructurado para cada candidato.</p>
            </div>
            <div className="flex items-center border border-gray-700 w-[45%] rounded-xl bg-gray-700">
              <FontAwesomeIcon icon={faUser} className="text-yellow-400 text-[3rem] pl-4" />
              <p className="px-8 py-3 text-white text-[1.3rem]"><span className="font-semibold text-yellow-400">Candidato:</span> puede visualizar el estado de su postulación y recibir devoluciones
                útiles para seguir mejorando.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-15">
            <div id="buttons" className="w-[30%] rounded-xl border border-gray-700 flex flex-col justify-center items-center bg-[url('/buttons-section.png')] bg-cover">
              <div className="m-[8%]">
                <SignInButton />
              </div>
              <div className="mb-[8%]">
                <SignUpButton />
              </div>
            </div>
        </div>
      </section>

      <section id="nosotros" className="bg-main">
        <div>
          <p className="px-17 pb-15 text-white font-semibold text-[2rem]">Empresas que trabajan con nosotros</p>
          <div className="carousel">
            <div className="group">
              <div className="card">
                <Image
                  src="/carousel_images/meli.jpg"
                  alt="meli"
                  width={300}
                  height={200}
                  loading="eager"
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/ford.jpg"
                  alt="ford"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/blizz.jpg"
                  alt="blizzard"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/ypf.jpg"
                  alt="ypf"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/samsung.jpg"
                  alt="samsung"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/riot.jpg"
                  alt="riot"
                  width={300}
                  height={200}
                />
              </div>
            </div>

            <div aria-hidden className="group">
              <div className="card">
                <Image
                  src="/carousel_images/meli.jpg"
                  alt="meli"
                  width={300}
                  height={200}
                  loading="eager"
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/ford.jpg"
                  alt="meli"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/blizz.jpg"
                  alt="meli"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/ypf.jpg"
                  alt="meli"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/samsung.jpg"
                  alt="meli"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/riot.jpg"
                  alt="meli"
                  width={300}
                  height={200}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="contacto" className="bg-main">
        <p className="px-17 py-15 text-white font-semibold text-[2rem]">Contacto</p>
        <div className="px-35 flex flex-col gap-4 items-start">
          <a href="https://instagram.com/tuusuario" target="_blank" className="flex items-center gap-3 text-white text-[1.6rem]"><FontAwesomeIcon icon={faInstagram} className="text-amber-500 text-[3rem] pr-2" />Instagram</a>
          <a href="https://instagram.com/tuusuario" target="_blank" className="flex items-center gap-3 text-white text-[1.6rem]"><FontAwesomeIcon icon={faGithub} className="text-amber-500 text-[3rem] pr-2" />GitHub</a>
          <a href="https://instagram.com/tuusuario" target="_blank" className="flex items-center gap-3 text-white text-[1.6rem]"><FontAwesomeIcon icon={faYoutube} className="text-amber-500 text-[3rem] pr-2" />YouTube</a>
        </div>
      </section>
    </div>
  );
}
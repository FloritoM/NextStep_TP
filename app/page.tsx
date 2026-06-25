import SignInButton from "@/components/auth/signInButton";
import SignUpButton from "@/components/auth/SignUpButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import { pacifico } from "./ui/fonts";

export default function Landing() {
  return (
    <div className="">
      <section id="inicio" className="bg-main">
        <header className="sticky top-0 w-full">
          <div className="bg-[url('/landing-header.png')] bg-cover">
            <h1 className="text-center text-[4rem] text-black font-bold py-4 select-none">Next<span className={`${pacifico.className} italic text-amber-600 font-semibold select-none`}>Step</span></h1>
            <p className="px-17 text-black font-semibold text-[1.5rem] text-center select-none">Simplificamos los procesos de selección y</p>
            <p className="px-17 pb-3 text-black font-semibold text-[1.5rem] text-center select-none">mejoramos la experiencia para reclutadores y candidatos.</p>
          </div>
          <div className="flex justify-center pb-5">
            <nav className="w-[100%]">
              <ul className="flex justify-center gap-15 text-white text-[1.5rem] bg-gray-700 py-3">
                <li><a href="#inicio" className="hover:text-amber-500">Inicio</a></li>
                <li><a href="#nosotros" className="hover:text-amber-500">Clientes</a></li>
                <li><a href="#contacto" className="hover:text-amber-500">Contacto</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <div>
          <p className="text-center pt-5 pb-10 text-white font-semibold text-[2rem]">¿Qué ofrecemos?</p>
          <div className="flex justify-evenly">
            <div className="flex items-center border border-gray-700 w-[45%] rounded-xl bg-gray-700">
              <FontAwesomeIcon icon={faUserTie} className="text-amber-600 text-[3rem] pl-4" />
              <p className="px-8 py-3 text-white text-[1.3rem]"><span className="font-semibold text-amber-600">Reclutador:</span> Puede publicar una búsqueda laboral, visualizar la información de los postulantes y
                cargar feedback estructurado para cada candidato.</p>
            </div>
            <div className="flex items-center border border-gray-700 w-[45%] rounded-xl bg-gray-700">
              <FontAwesomeIcon icon={faUser} className="text-yellow-400 text-[3rem] pl-4" />
              <p className="px-8 py-3 text-white text-[1.3rem]"><span className="font-semibold text-yellow-400">Candidato:</span> Puede aplicar a vacantes laborales, seguir el estado de sus postulaciones y recibir devoluciones
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
          <p className="pb-10 text-center text-white font-semibold text-[2rem]">Empresas que confían en nosotros</p>
          <div className="carousel">
            <div className="group">
              <div className="card">
                <Image
                  src="/carousel_images/meli.jpg"
                  alt="Logo de Mercado Libre"
                  width={300}
                  height={200}
                  loading="eager"
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/ford.jpg"
                  alt="Logo de Ford"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/blizz.jpg"
                  alt="Logo de Blizzard"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/ypf.jpg"
                  alt="Logo de YPF"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/samsung.jpg"
                  alt="Logo de Samsung"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/riot.jpg"
                  alt="Logo de Riot Games"
                  width={300}
                  height={200}
                />
              </div>
            </div>

            <div aria-hidden className="group">
              <div className="card">
                <Image
                  src="/carousel_images/meli.jpg"
                  alt="Logo de Mercado Libre"
                  width={300}
                  height={200}
                  loading="eager"
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/ford.jpg"
                  alt="Logo de Ford"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/blizz.jpg"
                  alt="Logo de Blizzard"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/ypf.jpg"
                  alt="Logo de YPF"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/samsung.jpg"
                  alt="Logo de Samsung"
                  width={300}
                  height={200}
                />
              </div>
              <div className="card">
                <Image
                  src="/carousel_images/riot.jpg"
                  alt="Logo de Riot Games"
                  width={300}
                  height={200}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer id="contacto" className="bg-main pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="text-white font-semibold text-[2rem] mb-8 text-center">
            Contacto
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 md:gap-12 pb-10 w-full">
            <a 
              href="https://www.instagram.com/centrouniversitariovl" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-white text-[1.25rem] md:text-[1.5rem] transition-all duration-300 hover:text-amber-500 hover:scale-105">
              <FontAwesomeIcon icon={faInstagram} className="text-amber-500 text-[2.5rem] md:text-[3rem]" />
              Instagram
            </a>
            <a 
              href="https://github.com/floritoM" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-white text-[1.25rem] md:text-[1.5rem] transition-all duration-300 hover:text-amber-500 hover:scale-105">
              <FontAwesomeIcon icon={faGithub} className="text-amber-500 text-[2.5rem] md:text-[3rem]" />
              GitHub
            </a>
            <a 
              href="https://www.youtube.com/watch?v=6dIr256vl1U" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-white text-[1.25rem] md:text-[1.5rem] transition-all duration-300 hover:text-amber-500 hover:scale-105">
              <FontAwesomeIcon icon={faYoutube} className="text-amber-500 text-[2.5rem] md:text-[3rem]" />
              YouTube
            </a>
          </div>
          <div className="w-full border-t border-white/10 my-4" />
          <div className="w-full pt-4 text-center text-white/60 text-sm md:text-base tracking-wide">
            <p>&copy; {new Date().getFullYear()} Centro Universitario VL. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
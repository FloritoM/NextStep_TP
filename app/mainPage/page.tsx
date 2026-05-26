import Header from "../ui/header";

export default async function MainPage() {
    return (
        <>
            <Header />
            <div className="h-full bg-main">
                <div className="flex flex-col gap-5 w-120 m-auto pt-19 content-center">
                    <h1 className="text-white text-[4rem] text-center font-bold">Bienvenido</h1>
                    <p className="text-white text-[3.5rem] text-center">Nahuel <span className="text-amber-600 text-[3.5rem]">Raimondi</span>!</p>
                </div>
            </div>
        </>
    );
}
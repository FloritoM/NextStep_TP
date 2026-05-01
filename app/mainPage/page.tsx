import Header from "../ui/header";

export default async function MainPage() {
    return (
        <>
            <Header />
            <div className="h-full bg-main">
                <h1>Bienvenido</h1>
                <p>ola komo stas</p>
            </div>
        </>
    );
}
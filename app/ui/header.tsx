import DashboardLink from "./dashboardLink";
import NextStepIcon from "../../components/icon";
import ProfileLink from "./profileLink";
import SignOutButton from "./signOutButton";

export default function Header() {

    return (
        <header className="sticky top-0 w-full grid grid-cols-3 h-20 bg-white">
            <div className="">
                <NextStepIcon />
            </div>
            <div className="flex place-items-center justify-end pr-4">
                <nav>
                    <ul className="flex gap-10">
                        <li><DashboardLink /></li>
                        <li><ProfileLink /></li>
                    </ul>
                </nav>
            </div>
            <div className="flex place-items-center justify-end pr-4">
                <SignOutButton />
            </div>
        </header>
    )
}
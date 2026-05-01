import DashboardLink from "./dashboardLink";
import NextStepIcon from "./icon";
import ProfileLink from "./profileLink";
import SignOutButton from "./signOutButton";

export default function Header() {

    return (
        <header className="grid grid-cols-3 h-20">
            <div className="border">
                <NextStepIcon />
            </div>
            <div className="border flex place-items-center justify-end pr-4">
                <nav>
                    <ul className="flex">
                        <li><DashboardLink /></li>
                        <li><ProfileLink /></li>
                    </ul>
                </nav>
            </div>
            <div className="border flex place-items-center justify-end pr-4">
                <SignOutButton />
            </div>
        </header>
    )
}
import DashboardLink from "./dashboardLink";
import NextStepIcon from "./icon";
import ProfileLink from "./profileLink";
import SignOutButton from "./signOutButton";

export default function Header() {

    return (
        <header className="flex justify-between border h-20">
            <div>
                <NextStepIcon />
            </div>
            <div>
                <nav>
                    <DashboardLink />
                    <ProfileLink />
                </nav>
            </div>
            <div>
                <SignOutButton />
            </div>
        </header>
    )
}
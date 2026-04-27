import DashboardLink from "./dashboardLink";
import SignOutButton from "./signOutButton";

export default function Nav() {

    return (
        <div>
            <NextStepIcon />
            <DashboardLink />
            <ProfileLink/>
            <SignOutButton />
        </div>

    )
}
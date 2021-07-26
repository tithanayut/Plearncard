import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import NavLink from "./NavItem/NavLink";
import NavButton from "./NavItem/NavButton";
import ProfileIcon from "../../icons/ProfileIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import HomeIcon from "../../icons/HomeIcon";
import SetsIcon from "../../icons/SetsIcon";
import SearchIcon from "../../icons/SearchIcon";
import LoginIcon from "../../icons/LoginIcon";

const NavBar = () => {
    const [authSession, authLoading] = useSession();
    const loggedIn = !authLoading && authSession;

    let leftNavItems, rightNavItems;
    if (loggedIn) {
        leftNavItems = (
            <>
                <NavLink href="/home" text="Home" icon={HomeIcon} />
                <NavLink href="/sets" text="My Sets" icon={SetsIcon} />
                <NavLink href="/search" text="Search" icon={SearchIcon} />
            </>
        );

        rightNavItems = (
            <>
                <NavLink
                    href="/profile"
                    text={authSession.user.name}
                    icon={ProfileIcon}
                />
                <NavButton
                    action={() => {
                        signOut({
                            redirect: false,
                            callbackUrl: "/",
                        });
                    }}
                    text="Logout"
                    icon={LogoutIcon}
                />
            </>
        );
    } else {
        rightNavItems = <NavLink href="/login" text="Login" icon={LoginIcon} />;
    }

    return (
        <nav className="flex justify-between items-center h-14 p-6 bg-green-500 text-white">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold mr-4 cursor-pointer">
                    <Link href="/">Plearncard</Link>
                </h1>
                <ul className="flex">{leftNavItems}</ul>
            </div>

            <ul className="flex">{rightNavItems}</ul>
        </nav>
    );
};

export default NavBar;

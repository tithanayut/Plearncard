import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { useTranslation } from "next-i18next";
import NavLink from "./NavItem/NavLink";
import NavButton from "./NavItem/NavButton";
import ProfileIcon from "../../../icons/ProfileIcon";
import LogoutIcon from "../../../icons/LogoutIcon";
import HomeIcon from "../../../icons/HomeIcon";
import SetsIcon from "../../../icons/SetsIcon";
import SearchIcon from "../../../icons/SearchIcon";
import LoginIcon from "../../../icons/LoginIcon";

const NavBar = () => {
    const [authSession, authLoading] = useSession();
    const loggedIn = !authLoading && authSession;

    const { t } = useTranslation("common");

    let leftNavItems, rightNavItems;
    if (loggedIn) {
        leftNavItems = (
            <>
                <NavLink href="/home" text={t("home")} icon={HomeIcon} />
                <NavLink href="/sets" text={t("my_sets")} icon={SetsIcon} />
                <NavLink href="/search" text={t("search")} icon={SearchIcon} />
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
                    text={t("logout")}
                    icon={LogoutIcon}
                />
            </>
        );
    } else {
        rightNavItems = (
            <NavLink href="/login" text={t("login")} icon={LoginIcon} />
        );
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

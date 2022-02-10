import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import { useTranslation } from "next-i18next";
import NavLink from "./NavItem/NavLink";
import NavButton from "./NavItem/NavButton";
import NavDirectLink from "./NavItem/NavDirectLink";
import ProfileIcon from "../../../icons/ProfileIcon";
import LogoutIcon from "../../../icons/LogoutIcon";
import HomeIcon from "../../../icons/HomeIcon";
import SetsIcon from "../../../icons/SetsIcon";
import SearchIcon from "../../../icons/SearchIcon";
import LoginIcon from "../../../icons/LoginIcon";
import GlobeIcon from "../../../icons/GlobeIcon";

const NavBar = () => {
    const [authSession, authLoading] = useSession();
    const loggedIn = !authLoading && authSession;

    const router = useRouter();
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
                <NavDirectLink
                    href={
                        router.locale === "en"
                            ? "/th/" + router.asPath
                            : router.asPath
                    }
                    text="TH/EN"
                    icon={GlobeIcon}
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
            <>
                <NavDirectLink
                    href={
                        router.locale === "en"
                            ? "/th/" + router.asPath
                            : router.asPath
                    }
                    text="TH/EN"
                    icon={GlobeIcon}
                />
                <NavLink href="/login" text={t("login")} icon={LoginIcon} />
            </>
        );
    }

    return (
        <nav className="flex h-14 items-center justify-between bg-green-500 p-6 text-white">
            <div className="flex items-center">
                <h1 className="mr-4 cursor-pointer text-2xl font-bold">
                    <Link href="/">Plearncard</Link>
                </h1>
                <ul className="flex">{leftNavItems}</ul>
            </div>

            <ul className="flex">{rightNavItems}</ul>
        </nav>
    );
};

export default NavBar;

import Link from "next/link";

const NavLink = (props) => {
    return (
        <li className="mx-2 cursor-pointer">
            <Link href={props.href}>
                <p className="flex items-center">
                    <span className="mr-1">
                        <props.icon />
                    </span>
                    <span className="hidden md:block">{props.text}</span>
                </p>
            </Link>
        </li>
    );
};

export default NavLink;

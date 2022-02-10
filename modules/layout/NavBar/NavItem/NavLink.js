import Link from "next/link";

const NavLink = (props) => {
    return (
        <li className="mx-2 cursor-pointer">
            <Link href={props.href}>
                <p className="flex items-center">
                    <props.icon className="mr-1 h-5 w-5" />
                    <span className="hidden md:block">{props.text}</span>
                </p>
            </Link>
        </li>
    );
};

export default NavLink;

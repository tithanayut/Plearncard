import Link from "next/link";

const NavLink = (props) => {
    return (
        <li className="mx-2 cursor-pointer">
            <Link href={props.href}>
                <p className="flex items-center">
                    <props.icon className="w-5 h-5 mr-1" />
                    <span className="hidden md:block">{props.text}</span>
                </p>
            </Link>
        </li>
    );
};

export default NavLink;

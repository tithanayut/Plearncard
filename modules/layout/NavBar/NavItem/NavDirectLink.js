const NavDirectLink = (props) => {
    return (
        <li className="mx-2 cursor-pointer">
            <a href={props.href}>
                <p className="flex items-center">
                    <props.icon className="w-5 h-5 mr-1" />
                    <span className="hidden md:block">{props.text}</span>
                </p>
            </a>
        </li>
    );
};

export default NavDirectLink;

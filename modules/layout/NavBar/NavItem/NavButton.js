const NavButton = (props) => {
    return (
        <li className="mx-2 cursor-pointer" onClick={props.action}>
            <p className="flex items-center">
                <props.icon className="mr-1 h-5 w-5" />
                <span className="hidden md:block">{props.text}</span>
            </p>
        </li>
    );
};

export default NavButton;

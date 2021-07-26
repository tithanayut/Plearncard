const NavButton = (props) => {
    return (
        <li className="mx-2 cursor-pointer" onClick={props.action}>
            <p className="flex items-center">
                <span className="mr-1">
                    <props.icon />
                </span>
                <span className="hidden md:block">{props.text}</span>
            </p>
        </li>
    );
};

export default NavButton;

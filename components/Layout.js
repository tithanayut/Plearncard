import NavBar from "./NavBar";

const Layout = (props) => {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main className="mb-8">{props.children}</main>
        </>
    );
};

export default Layout;

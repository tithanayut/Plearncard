import { Fragment } from "react";

import NavBar from "./NavBar";

const Layout = (props) => {
	return (
		<Fragment>
			<header>
				<NavBar />
			</header>
			<main className="mb-8">{props.children}</main>
		</Fragment>
	);
};

export default Layout;

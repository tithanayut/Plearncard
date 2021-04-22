import { Fragment } from "react";

import NavBar from "./NavBar";

const Layout = (props) => {
	return (
		<Fragment>
			<header>
				<NavBar />
			</header>
			<main>{props.children}</main>
		</Fragment>
	);
};

export default Layout;

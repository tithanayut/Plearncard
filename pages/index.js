import { Fragment } from "react";
import Head from "next/head";

const IndexPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Plearncard</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>

			<div className="container mx-auto bg-gray-500">Hello!</div>
		</Fragment>
	);
};

export default IndexPage;

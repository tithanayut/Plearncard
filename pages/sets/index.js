const SetsPage = () => {
	return <div></div>;
};

export async function getStaticProps() {
	return {
		redirect: {
			destination: "/collection",
			permanent: true,
		},
	};
}

export default SetsPage;

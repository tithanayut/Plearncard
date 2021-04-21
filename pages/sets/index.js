import { useEffect } from "react";
import { useRouter } from "next/router";

const SetsPage = () => {
	const router = useRouter();
	useEffect(router.replace("/collection"), []);

	return <div></div>;
};

export default SetsPage;

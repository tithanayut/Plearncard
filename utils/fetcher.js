export default async (url) => {
	const res = await fetch(url);
	if (!res.ok) {
		const error = new Error("Error");
		error.info = await res.json();
		throw error;
	}
	return res.json();
};

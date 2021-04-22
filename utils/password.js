import bcrypt from "bcrypt";

export async function hash(password) {
	return await bcrypt.hash(password, 12);
}

export async function validate(plaintext, hashed) {
	return await bcrypt.compare(plaintext, hashed);
}

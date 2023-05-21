import { z } from 'zod';

type PasswordValidationProps = {
	password: string;
};

export const PasswordValidation = async ({
	password,
}: PasswordValidationProps) => {
	const schema = z
		.string()
		.min(7)
		.regex(/[A-Z]/)
		.regex(/\d/)
		.regex(/[!@#$%^&*(),.?":{}|<>]/);

	try {
		return schema.parse(password);
	} catch {
		return false;
	}
};

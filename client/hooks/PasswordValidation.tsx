import { z } from 'zod';

type PasswordValidationProps = {
	password: string;
};

export const PasswordValidation = async ({
	password,
}: PasswordValidationProps) => {
	const schema = z
		.string()
		.regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{7,}$/);

	try {
		return schema.parse(password);
	} catch {
		return false;
	}
};

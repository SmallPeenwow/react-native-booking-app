import { z } from 'zod';

type usePasswordValidationProps = {
	password: string;
};

export const usePasswordValidation = async ({
	password,
}: usePasswordValidationProps) => {
	const schema = z
		.string()
		.regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{7,}$/);

	try {
		return schema.parse(password);
	} catch {
		return false;
	}
};

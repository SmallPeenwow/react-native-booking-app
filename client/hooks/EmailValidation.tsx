import { z } from 'zod';

type EmailValidationProp = {
	email: string;
};

export const EmailValidation = async ({ email }: EmailValidationProp) => {
	const schema = z.coerce.string().email();

	try {
		return schema.parse(email);
	} catch {
		return false;
	}
};

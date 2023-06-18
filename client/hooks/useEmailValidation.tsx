import { z } from 'zod';

type useEmailValidationProp = {
	email: string;
};

export const useEmailValidation = async ({ email }: useEmailValidationProp) => {
	const schema = z.coerce.string().email();

	try {
		return schema.parse(email);
	} catch {
		return false;
	}
};

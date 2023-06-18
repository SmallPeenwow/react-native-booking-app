import { z } from 'zod';

type useNameValidationProp = {
	name: string;
};

export const useNameValidation = async ({ name }: useNameValidationProp) => {
	const schema = z.coerce
		.string()
		.min(2)
		.max(30)
		.regex(/^[a-zA-Z\s]+$/);

	try {
		return schema.parse(name);
	} catch {
		return false;
	}
};

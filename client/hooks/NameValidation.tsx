import { z } from 'zod';

type NameValidationProp = {
	name: string;
};

export const NameValidation = async ({ name }: NameValidationProp) => {
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

import { z } from 'zod';

type IsPasswordEmptyProp = {
	password: string;
};

export const IsPasswordEmpty = async ({ password }: IsPasswordEmptyProp) => {
	const schema = z.string().refine(async (value) => /\s/.test(value));

	try {
		return schema.parse(password);
	} catch {
		return false;
	}
};

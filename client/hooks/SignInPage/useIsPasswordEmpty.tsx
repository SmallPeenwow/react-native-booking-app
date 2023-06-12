import { z } from 'zod';

type useIsPasswordEmptyProp = {
	password: string;
};

export const useIsPasswordEmpty = async ({
	password,
}: useIsPasswordEmptyProp) => {
	const schema = z.string().refine(async (value) => /\s/.test(value));

	try {
		return schema.parse(password);
	} catch {
		return false;
	}
};

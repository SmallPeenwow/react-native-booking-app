import { z } from 'zod';

type useCellNumberValidationProp = {
	cellNumber: string;
};

export const useCellNumberValidation = async ({
	cellNumber,
}: useCellNumberValidationProp) => {
	const schema = z.coerce.number();
	let value: any = cellNumber.replace(/ /g, '');

	try {
		return schema.parse(value);
	} catch {
		return false;
	}
};

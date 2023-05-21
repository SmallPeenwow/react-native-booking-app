import { z } from 'zod';

type CellNumberValidationProp = {
	cellNumber: string;
};

export const CellNumberValidation = async ({
	cellNumber,
}: CellNumberValidationProp) => {
	const schema = z.coerce.number();
	let value: any = cellNumber.replace(/ /g, '');

	try {
		return schema.parse(value);
	} catch {
		return false;
	}
};

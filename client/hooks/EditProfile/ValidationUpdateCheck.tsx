import { CellNumberValidation } from '../CellNumberValidation';
import { EmailValidation } from '../EmailValidation';

type ValidationUpdateCheckProps = {
	email: string;
	cellNumber: string;
	oldEmail: string;
	oldCellNumber: number;
};

export const ValidationUpdateCheck = async ({
	email,
	cellNumber,
	oldEmail,
	oldCellNumber,
}: ValidationUpdateCheckProps) => {
	let errorTrue = false;
	let responseMessage = 'no error';

	if (email === oldEmail) {
		return {
			errorTrue: true,
			responseMessage: 'Email is same as old email',
		};
	} else if (cellNumber === oldCellNumber.toString()) {
		return {
			errorTrue: true,
			responseMessage: 'Cell Number is same as old cell number',
		};
	} else if (!(await EmailValidation({ email: email })) && email.length !== 0) {
		return {
			errorTrue: true,
			responseMessage: 'Email invalid \nEg: example@gmail.com',
		};
	} else if (
		!(await CellNumberValidation({ cellNumber: cellNumber })) &&
		cellNumber.length !== 0
	) {
		return {
			errorTrue: true,
			responseMessage: 'Cell number invalid \nEg: 0799341345',
		};
	}

	return { errorTrue, responseMessage };
};

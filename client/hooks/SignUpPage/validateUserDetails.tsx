import { CellNumberValidation } from '../CellNumberValidation';
import { EmailValidation } from '../EmailValidation';
import { NameValidation } from '../NameValidation';
import { PasswordValidation } from '../PasswordValidation';

type validateUserDetailsProps = {
	cellNumber: string;
	email: string;
	username: string;
	password: string;
	dateOfBirth: Date;
};

export const validateUserDetails = async ({
	cellNumber,
	email,
	username,
	password,
	dateOfBirth,
}: validateUserDetailsProps) => {
	let errorResult = false;
	let responseMessage = 'no error';

	if (!(await NameValidation({ name: username }))) {
		return {
			errorResult: true,
			responseMessage: 'Name invalid \nEg: Joe',
		};
	} else if (!(await EmailValidation({ email: email }))) {
		return {
			errorResult: true,
			responseMessage: 'Email invalid \nEg: example@gmail.com',
		};
	} else if (!(await PasswordValidation({ password: password }))) {
		return {
			errorResult: true,
			responseMessage: 'Password requirements not met',
		};
	} else if (
		dateOfBirth.toLocaleDateString() === new Date().toLocaleDateString()
	) {
		return {
			errorResult: true,
			responseMessage: 'Fill in Date of Birth',
		};
	} else if (!(await CellNumberValidation({ cellNumber: cellNumber }))) {
		return {
			errorResult: true,
			responseMessage: 'Cell number invalid \nEg: 079 934 1345',
		};
	}

	return { errorResult, responseMessage };
};

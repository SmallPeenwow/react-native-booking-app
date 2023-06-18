import { useCellNumberValidation } from '../useCellNumberValidation';
import { useEmailValidation } from '../useEmailValidation';
import { useNameValidation } from '../useNameValidation';
import { usePasswordValidation } from '../usePasswordValidation';

type useValidateUserDetailsProps = {
	cellNumber: string;
	email: string;
	username: string;
	password: string;
	dateOfBirth: Date;
};

export const useValidateUserDetails = async ({
	cellNumber,
	email,
	username,
	password,
	dateOfBirth,
}: useValidateUserDetailsProps) => {
	let errorResult = false;
	let responseMessage = 'no error';

	if (!(await useNameValidation({ name: username }))) {
		return {
			errorResult: true,
			responseMessage: 'Name invalid \nEg: Joe',
		};
	} else if (!(await useEmailValidation({ email: email }))) {
		return {
			errorResult: true,
			responseMessage: 'Email invalid \nEg: example@gmail.com',
		};
	} else if (!(await usePasswordValidation({ password: password }))) {
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
	} else if (!(await useCellNumberValidation({ cellNumber: cellNumber }))) {
		return {
			errorResult: true,
			responseMessage: 'Cell number invalid \nEg: 079 934 1345',
		};
	}

	return { errorResult, responseMessage };
};

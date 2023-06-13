import { makeRequest } from './makeRequest';

type CreateAccountProps = {
	name: string;
	surname: string;
	email: string;
	password: string;
	cellNumber: string;
	dateOfBirth: Date;
};

export async function CreateAccount({
	name,
	surname,
	email,
	password,
	cellNumber,
	dateOfBirth,
}: CreateAccountProps) {
	return await makeRequest('/SignUpPage/create', {
		method: 'POST',
		data: { name, surname, email, password, cellNumber, dateOfBirth },
	});
}

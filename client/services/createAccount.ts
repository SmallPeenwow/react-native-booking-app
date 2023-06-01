import { makeRequest } from './makeRequest';

export async function CreateAccount(
	name: string,
	surname: string,
	email: string,
	password: string,
	cellNumber: string,
	dateOfBirth: Date,
	address: string
) {
	return await makeRequest('/SignUpPage/create', {
		method: 'POST',
		data: { name, surname, email, password, cellNumber, dateOfBirth, address },
	});
}

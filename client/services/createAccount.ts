import { makeRequest } from './makeRequest';

export async function CreateAccount() {
	return await makeRequest(`/SignUpPage/`);
}

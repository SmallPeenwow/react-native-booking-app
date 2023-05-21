import { makeRequest } from './makeRequest';

export async function Login(email: string, password: string) {
	return await makeRequest(`/SignInPage/${email}/${password}`, {
		method: 'GET',
		data: { email, password },
	});
}

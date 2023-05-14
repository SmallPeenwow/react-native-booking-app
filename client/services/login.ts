import { makeRequest } from './makeRequest';

export async function getLoginAccess(email: string, password: string) {
	console.log(email);
	console.log(password);
	return await makeRequest(`/SignInPage/${email}/${password}`);
	// return await makeRequest(`/${email}/${password}`);
}

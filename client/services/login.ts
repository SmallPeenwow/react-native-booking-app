import { makeRequest } from './makeRequest';

type LoginProps = {
	email: string;
	password: string;
};

export async function Login({ email, password }: LoginProps) {
	return await makeRequest(`/SignInPage/login`, {
		method: 'POST',
		data: { email, password },
	});
}

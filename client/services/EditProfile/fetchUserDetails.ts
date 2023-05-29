import { makeRequest } from '../makeRequest';

export async function FetchUserDetails(id: number) {
	return await makeRequest('/EditProfile/fetchUserDetails', {
		method: 'POST',
		data: { id },
	});
}

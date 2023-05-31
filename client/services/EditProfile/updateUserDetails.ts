import { makeRequest } from '../makeRequest';

export async function updateUserDetails(
	id: string,
	email: string,
	cellNumber: string
) {
	return await makeRequest(`/EditProfile/updateUserDetails/${id}`, {
		method: 'POST',
		data: { email, cellNumber },
	});
}

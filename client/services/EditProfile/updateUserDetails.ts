import { makeRequest } from '../makeRequest';

type UpdateUserDetailsProps = {
	id: number;
	email: string;
	cellNumber: string;
};

export async function updateUserDetails({
	id,
	email,
	cellNumber,
}: UpdateUserDetailsProps) {
	return await makeRequest(`/EditProfile/updateUserDetails/${id}`, {
		method: 'POST',
		data: { email, cellNumber },
	});
}

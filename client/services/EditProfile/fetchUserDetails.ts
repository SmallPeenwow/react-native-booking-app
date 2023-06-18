import { makeRequest } from '../makeRequest';

type FetchUserDetailsProps = {
	id: number;
};

export async function FetchUserDetails({ id }: FetchUserDetailsProps) {
	return await makeRequest('/EditProfile/fetchUserDetails', {
		method: 'POST',
		data: { id },
	});
}

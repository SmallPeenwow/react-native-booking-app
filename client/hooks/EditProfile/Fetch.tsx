import { FetchUserDetails } from '../../services/EditProfile/fetchUserDetails';
import { AsyncStorageRetrieve } from '../LocalStorage/AsyncStorageRetrieve';

export const Fetch = async () => {
	const id: string = await AsyncStorageRetrieve(
		'Justin-Bowden-booking-application-id'
	).then((data) => {
		return data!;
	});

	const userDetails = await FetchUserDetails(parseInt(id));

	let email: string = userDetails.email;
	let cellNumber: number = userDetails.cell_number;

	return { email, cellNumber };
};

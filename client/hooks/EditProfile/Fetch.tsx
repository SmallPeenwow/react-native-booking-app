import { FetchUserDetails } from '../../services/EditProfile/fetchUserDetails';
import { AsyncStorageRetrieve } from '../LocalStorage/AsyncStorageRetrieve';

export interface UserStorage {
	id: string;
	address: string;
}

export const Fetch = async () => {
	const jsonString: string | null = await AsyncStorageRetrieve(
		'Justin-Bowden-booking-application-id'
	);

	let oldEmail: string = 'null';
	let oldCellNumber: number = 0;

	if (jsonString !== null) {
		let userId: UserStorage = JSON.parse(jsonString);

		const userDetails = await FetchUserDetails(parseInt(userId.id));

		oldEmail = userDetails.email;
		oldCellNumber = userDetails.cell_number;
	}

	return { oldEmail, oldCellNumber };
};

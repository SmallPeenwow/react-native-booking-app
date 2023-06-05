import { FetchUserDetails } from '../../services/EditProfile/fetchUserDetails';
import { UserStorage } from '../../shared/interfaces/userStorage.interface';
import { useAsyncStorageRetrieve } from '../LocalStorage/useAsyncStorageRetrieve';

export const Fetch = async () => {
	const jsonString: string | null = await useAsyncStorageRetrieve(
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

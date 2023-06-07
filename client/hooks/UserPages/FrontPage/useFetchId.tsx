import { useMemo } from 'react';
import { UserStorage } from '../../../shared/interfaces/userStorage.interface';
import { useAsyncStorageRetrieve } from '../../LocalStorage/useAsyncStorageRetrieve';

export const useFetchId = () => {
	const userId = useMemo(async () => {
		const jsonString: string | null = await useAsyncStorageRetrieve(
			'Justin-Bowden-booking-application-id'
		);
		// 	.then((data) => {
		// 		return data;
		// 	})
		// 	.then((value) => {
		// 		return value;
		// 	});

		// console.log(jsonString);
		// return jsonString;

		if (jsonString !== null) {
			let id: UserStorage = JSON.parse(jsonString);

			return id.id;
		}
	}, []);

	console.log(userId, ' id');
	return { userId };
};

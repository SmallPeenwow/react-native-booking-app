import { useEffect, useState } from 'react';
import { UserStorage } from '../../../shared/interfaces/userStorage.interface';
import { useAsyncStorageRetrieve } from '../../LocalStorage/useAsyncStorageRetrieve';

export const useFetchId = () => {
	const [userId, setUserId] = useState<string | null>(null);

	// SLOW
	useEffect(() => {
		const fetchData = async () => {
			const jsonString: string | null = await useAsyncStorageRetrieve(
				'Justin-Bowden-booking-application-id'
			);

			if (jsonString !== null) {
				let userStorageArray: UserStorage = JSON.parse(jsonString);

				setUserId(userStorageArray.id);
			}
		};
		fetchData();
	}, []);

	return { userId };
};

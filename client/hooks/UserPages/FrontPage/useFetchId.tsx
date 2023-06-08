import { useMemo } from 'react';
import { UserStorage } from '../../../shared/interfaces/userStorage.interface';
import { useAsyncStorageRetrieve } from '../../LocalStorage/useAsyncStorageRetrieve';

export const useFetchId = () => {
	const userId = useMemo(async () => {
		const jsonString: string | null = await useAsyncStorageRetrieve(
			'Justin-Bowden-booking-application-id'
		);

		if (jsonString !== null) {
			let id: UserStorage = JSON.parse(jsonString);

			return id.id;
		}
	}, []);

	return { userId };
};

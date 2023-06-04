import AsyncStorage from '@react-native-async-storage/async-storage';

export const SaveInStorage = async (id: number) => {
	let userObject = {
		id: id,
	};

	await AsyncStorage.setItem(
		'Justin-Bowden-booking-application-id',
		JSON.stringify(userObject)
	);
};

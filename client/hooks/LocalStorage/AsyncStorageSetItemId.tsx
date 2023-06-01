import AsyncStorage from '@react-native-async-storage/async-storage';

// MAYBE make string a CONST in constants folder to import
export const SaveInStorage = async (id: number, address: string) => {
	let userObject = {
		id: id,
		address: address,
	};

	await AsyncStorage.setItem(
		'Justin-Bowden-booking-application-id',
		JSON.stringify(userObject)
	);
};

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageRetrieve = async (inputString: string) => {
	return await AsyncStorage.getItem(inputString);
};

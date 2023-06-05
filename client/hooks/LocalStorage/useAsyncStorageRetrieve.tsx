import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorageRetrieve = async (inputString: string) => {
	return await AsyncStorage.getItem(inputString);
};

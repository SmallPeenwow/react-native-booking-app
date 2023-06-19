import { View, Text } from 'react-native';
import React from 'react';

const DialogAddressNote = () => {
	return (
		<View className='py-2 border-b border-black'>
			<Text className='text-red-600 font-semibold'>NB:</Text>
			<Text className='text-xs'>
				If visit type is home please fill in your address.
			</Text>
			<Text className='font-semibold text-xs'>Eg. 23 Crest View Rd Nahoon</Text>
		</View>
	);
};

export default DialogAddressNote;

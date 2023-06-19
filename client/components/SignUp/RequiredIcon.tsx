import { View, Text } from 'react-native';
import React from 'react';

const RequiredIcon = () => {
	return (
		<View>
			<Text className='text-red-600 ml-4 text-2xl'>*</Text>
		</View>
	);
};

export default RequiredIcon;

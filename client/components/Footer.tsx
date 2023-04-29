import { View, Text } from 'react-native';

import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
	default: 'native',
});

const Footer = () => {
	return (
		<View className='h-10 bg-red-600 justify-center items-center p-3'>
			<Text className=''>Bottom</Text>
		</View>
	);
};

export default Footer;

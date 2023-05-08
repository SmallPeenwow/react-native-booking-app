import { View, Text } from 'react-native';
import React from 'react';
import textShadowStyle from '../styles/textShadowStyle';

const Header = () => {
	return (
		<View className='bg-main-color p-3 pt-12 pb-4'>
			<Text
				style={textShadowStyle.textShadow}
				className='text-white text-2xl font-bold'
			>
				Justin Bowden Biokineticist
			</Text>
		</View>
	);
};

export default Header;

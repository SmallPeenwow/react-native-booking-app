import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS as colorSet } from '../constants/theme';
import styles from '../styles/styleSheet';

const PlainActivityIndicator = () => {
	return (
		<View className='h-full items-center justify-center w-full'>
			<ActivityIndicator
				size='large'
				style={styles.activityIndicator}
				color={colorSet.primary}
			/>
		</View>
	);
};

export default PlainActivityIndicator;

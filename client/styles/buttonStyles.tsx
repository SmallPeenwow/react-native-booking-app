import { StyleSheet } from 'react-native';

import { SHADOWS } from '../constants/theme';

const buttonStyles = StyleSheet.create({
	button: {
		...SHADOWS.shadow,
	},
	buttonTextActive: {
		color: '#ffffff',
	},
});

export default buttonStyles;

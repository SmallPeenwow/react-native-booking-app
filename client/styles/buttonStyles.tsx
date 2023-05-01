import { StyleSheet } from 'react-native';

import { SHADOWS } from '../constants/theme';

const buttonStyles = StyleSheet.create({
	button: {
		...SHADOWS.button,
	},
	buttonTextActive: {
		color: '#ffffff',
	},
});

export default buttonStyles;

import { StyleSheet } from 'react-native';

import { SHADOWS } from '../constants/theme';

const containerStyles = StyleSheet.create({
	container: {
		...SHADOWS.shadow,
	},
});

export default containerStyles;

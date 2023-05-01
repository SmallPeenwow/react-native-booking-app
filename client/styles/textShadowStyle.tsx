import { StyleSheet } from 'react-native';

import { TEXTSHADOW } from '../constants/theme';

const textShadowStyle = StyleSheet.create({
	textShadow: {
		...TEXTSHADOW.textShadow,
	},
});

export default textShadowStyle;

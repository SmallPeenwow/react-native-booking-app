import { StyleSheet } from 'react-native';

const adminStyles = StyleSheet.create({
	scrollView: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		gap: 30,
		alignItems: 'center',
		height: '100%',
		marginTop: 15,
		paddingBottom: 40,
	},
	activityIndicator: {
		padding: 10,
		transform: [{ scaleX: 2 }, { scaleY: 2 }],
	},
});

export default adminStyles;

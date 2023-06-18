import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: '#ebebeb',
		height: 50,
		paddingTop: 5,
		paddingBottom: 5,
	},
	scrollView: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		gap: 30,
		alignItems: 'center',
		marginTop: 15,
		paddingBottom: 40,
	},
	activityIndicator: {
		padding: 10,
		transform: [{ scaleX: 2 }, { scaleY: 2 }],
	},
});

export default styles;

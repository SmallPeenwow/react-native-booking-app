import { BackHandler, Alert } from 'react-native';
import { SendToPage } from '../SendToPage';

type BackActionEventProps = {
	title: string;
	message: string;
	page: string;
};

const BackActionEvent = ({ title, message, page }: BackActionEventProps) => {
	const { push } = SendToPage();

	//ISSUE back handler on landing page fails when going back after going into sign in or sign up
	console.log(page === 'exit');
	const backAction = () => {
		Alert.alert(title, message, [
			{ text: 'Cancel', onPress: () => null, style: 'cancel' },
			{
				text: 'YES',
				onPress: () => (page === 'exit' ? BackHandler.exitApp() : push(page)),
			},
		]);

		return true;
	};

	BackHandler.addEventListener('hardwareBackPress', backAction);
};

export default BackActionEvent;

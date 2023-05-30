import { BackHandler, Alert } from 'react-native';
import { SendToPage } from '../SendToPage';
import { useEffect } from 'react';

type BackActionEventProps = {
	title: string;
	message: string;
	page: string;
};

export const BackActionEvent = ({
	title,
	message,
	page,
}: BackActionEventProps) => {
	const { push } = SendToPage();

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

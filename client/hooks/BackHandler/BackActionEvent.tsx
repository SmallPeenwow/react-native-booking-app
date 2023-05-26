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

	useEffect(() => {
		const backAction = () => {
			Alert.alert(title, message, [
				{ text: 'Cancel', onPress: () => null, style: 'cancel' },
				{ text: 'YES', onPress: () => push(page) },
			]);

			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		);

		return () => backHandler.remove();
	}, []);
};

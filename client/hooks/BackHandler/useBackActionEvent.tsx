import { BackHandler, Alert } from 'react-native';
import { useSendToPage } from '../useSendToPage';
import { useEffect } from 'react';

type useBackActionEventProps = {
	title: string;
	message: string;
	page: string;
};

export const useBackActionEvent = ({
	title,
	message,
	page,
}: useBackActionEventProps) => {
	const { push } = useSendToPage();

	const pageCheck = () => {
		page === 'exit' ? BackHandler.exitApp() : push(page);
	};

	useEffect(() => {
		const backAction = () => {
			Alert.alert(title, message, [
				{ text: 'Cancel', onPress: () => null, style: 'cancel' },
				{
					text: 'YES',
					onPress: pageCheck,
				},
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

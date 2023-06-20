import { BackHandler, Alert } from 'react-native';
import { useSendToPage } from '../useSendToPage';
import { useEffect } from 'react';
// import { socket } from '../../app/index';

type useBackActionEventProps = {
	title: string;
	message: string;
	page: string;
	socketEvent?: string | undefined;
};

export const useBackActionEvent = ({
	title,
	message,
	page,
	socketEvent,
}: useBackActionEventProps) => {
	const { push } = useSendToPage();

	const pageCheck = () => {
		// Doesn't seem to work
		// if (socketEvent === 'disconnect') {
		// 	socket.on('disconnect', () => {});
		// }
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

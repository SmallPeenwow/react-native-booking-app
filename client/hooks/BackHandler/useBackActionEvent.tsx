import { BackHandler, Alert } from 'react-native';
import { useSendToPage } from '../useSendToPage';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { ServerToClientEvents } from '../../shared/interfaces/serverToClientEvents.interface';

type useBackActionEventProps = {
	title: string;
	message: string;
	page: string;
	socketEvent?: string | null;
	socketImport?: Socket<ServerToClientEvents> | null;
};

export const useBackActionEvent = ({
	title,
	message,
	page,
	socketEvent,
	socketImport,
}: useBackActionEventProps) => {
	const { push } = useSendToPage();

	const pageCheck = () => {
		// MAYBE: make short
		if (
			socketEvent !== null &&
			socketImport !== null &&
			socketImport !== undefined &&
			socketEvent === 'disconnect'
		) {
			socketImport.disconnect();
		}
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

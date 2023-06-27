import { View, Text } from 'react-native';
import Button from '../components/Button';
import { useBackActionEvent } from '../hooks/BackHandler/useBackActionEvent';
import textShadowStyle from '../styles/textShadowStyle';
import { useSendToPage } from '../hooks/useSendToPage';
import { io } from 'socket.io-client';
import { API_URL } from '@env';

// export const socket = io('http://192.168.1.51:3001', {
export const socket = io(API_URL, {
	transports: ['websocket'],
});

const index = () => {
	const { push } = useSendToPage();

	useBackActionEvent({
		title: 'Exit',
		message: 'Do you want to exit the application?',
		page: 'exit',
		socketEvent: 'disconnect',
		socketImport: socket,
	});

	const SendToSignIn = () => {
		push('/SignInPage');
	};

	const SendToSignUp = () => {
		push('/SignUpPage');
	};

	return (
		<View className='h-full bg-white items-center justify-center flex-col'>
			<View className='items-center justify-center mb-8'>
				<Text
					style={textShadowStyle.textShadow}
					className='text-main-color text-7xl'
				>
					Welcome
				</Text>
			</View>
			<View className='flex-col items-center justify-center'>
				<Button title='Sign In' onPress={SendToSignIn} />
				<Button title='Sign Up' onPress={SendToSignUp} />
			</View>
		</View>
	);
};

export default index;

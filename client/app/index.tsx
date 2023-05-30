import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import { BackActionEvent } from '../hooks/BackHandler/BackActionEvent';

import textShadowStyle from '../styles/textShadowStyle';

const index = () => {
	const router = useRouter();

	BackActionEvent({
		title: 'Exit',
		message: 'Do you want to exit the application?',
		page: 'exit',
	});

	const SendToSignIn = () => {
		router.push('/SignInPage');
	};

	const SendToSignUp = () => {
		router.push('/SignUpPage');
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

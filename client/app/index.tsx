import { View, Text } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';

// TODO: Make Landing Page This

const index = () => {
	const router = useRouter();

	const SendToSignIn = () => {
		router.push('/SignInPage');
	};

	const SendToSignUp = () => {
		router.push('/SignUpPage');
	};

	return (
		<View className='h-full bg-white items-center justify-center flex-col'>
			<View className='gap-20 flex-col items-center justify-center border-2 border-black'>
				<Text className='text-main-color text-5xl'>Welcome</Text>
				<Button title='Sign In' onPress={SendToSignIn} />
				<Button title='Sign Up' onPress={SendToSignUp} />
			</View>
		</View>
	);
};

export default index;

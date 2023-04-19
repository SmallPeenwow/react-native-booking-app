import { Text, View } from 'react-native';
import Head from 'expo-router/head';
import { useRouter } from 'expo-router';

const Login = () => {
	const router = useRouter();

	const SendToSignUp = () => {
		router.push('/SignUp');
	};

	const SendToUserFrontPage = () => {
		router.push('/FrontPage');
	};

	return (
		<>
			<Head>
				<title>Login</title>
				<meta name='Login' content='Login' />
			</Head>
			<View className='h-full bg-gray-400 justify-center items-center'>
				<View className='border-2 w-64 p-8 border-black gap-8'>
					<Text>First Page User Will See</Text>
					<Text className='text-xl uppercase' onPress={SendToSignUp}>
						Sign Up
					</Text>
					<Text onPress={SendToUserFrontPage}>User Home Page</Text>
				</View>
			</View>
		</>
	);
};

export default Login;

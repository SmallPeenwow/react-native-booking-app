import { Text, View } from 'react-native';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

// SplashScreen styling is in app.json

const Login = () => {
	const router = useRouter();

	const SendToSignUp = () => {
		router.push('/SignUp');
	};

	const SendToUserFrontPage = () => {
		router.push('/FrontPage');
	};

	const SendToBookingRequests = () => {
		router.push('/BookingRequests');
	};

	const [isReady, setIsReady] = useState(false);

	// Must do better useEffect
	useEffect(() => {
		setTimeout(() => {
			setIsReady(true);
		}, 3000);
	}, []);

	return (
		<>
			{!isReady && <SplashScreen />}
			<View className='h-full bg-gray-400 justify-center items-center'>
				<Stack.Screen
					options={{
						title: null,
						headerRight: () => (
							<Text className='uppercase text-lg pr-3'>Login</Text>
						),
					}}
				/>
				<View className='border-2 w-64 p-8 border-black gap-8'>
					<Text>First Page User Will See</Text>
					<Text className='text-xl uppercase' onPress={SendToSignUp}>
						Sign Up
					</Text>
					<Text onPress={SendToUserFrontPage}>User Home Page</Text>
				</View>
				<View className='border-purple-300 border-2 p-2'>
					<Text onPress={SendToBookingRequests}>Login as Admin</Text>
				</View>
				<StatusBar style='auto' />
			</View>
		</>
	);
};

export default Login;

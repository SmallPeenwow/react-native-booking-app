import { View, Text } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// TODO: Make Landing Page This

const index = () => {
	const router = useRouter();

	const SendToSignUp = () => {
		router.push('/SignUp');
	};

	const SendToUserPage = () => {
		router.push('/UserPages');
	};

	const SendToBookingRequests = () => {
		router.push('/BookingRequests');
	};

	return (
		<View className='h-full bg-gray-400 justify-center items-center'>
			<Stack.Screen
				options={{
					title: 'Login',
				}}
			/>
			<View className='border-2 w-64 p-8 border-black gap-8'>
				<Text>First Page User Will See</Text>
				<Text className='text-xl uppercase' onPress={SendToSignUp}>
					Sign Up
				</Text>
				<Text onPress={SendToUserPage}>User Home Page</Text>
			</View>
			<View className='border-purple-300 border-2 p-2'>
				<Text onPress={SendToBookingRequests}>Login as Admin</Text>
			</View>
			<StatusBar style='auto' />
		</View>
	);
};

export default index;

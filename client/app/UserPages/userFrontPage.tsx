import { Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import UserProfile from '../../components/UserProfile';
import { AntDesign } from '@expo/vector-icons';

const FrontPage = () => {
	const router = useRouter();

	const SendToUserBookingTimes = () => {
		router.push('/UserBookingTimes');
	};

	return (
		<View className='h-full bg-green-400 p-2'>
			<Stack.Screen
				options={{
					headerTitle: 'Booking Dates',
					headerRight: () => <UserProfile />,
					headerTitleAlign: 'center',
					headerLeft: () => (
						<AntDesign
							onPress={() => router.back()}
							name='leftcircleo'
							size={24}
							color='black'
						/>
					),
				}}
			/>
			<View className='gap-6'>
				<View className='items-end '>
					<Text className='font-bold' onPress={SendToUserBookingTimes}>
						Will send to user booking page
					</Text>
				</View>
				<View>
					<Text>
						Page User Can See What Dates/Times Are Available Or Booked
					</Text>
					<Text>Second Page User Will See After Signing In</Text>
				</View>
			</View>
		</View>
	);
};

export default FrontPage;

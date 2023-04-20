import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

const UserProfile = () => {
	const router = useRouter();

	const SentToEditProfile = () => {
		router.push('/EditProfile');
	};

	return (
		<View className='flex-row gap-3 items-center'>
			<Text className='underline' onPress={SentToEditProfile}>
				Edit
			</Text>
			<Text className='bg-gray-500 px-2 text-xl rounded-full'>C</Text>
		</View>
	);
};

export default UserProfile;

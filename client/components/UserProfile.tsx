import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
	default: 'native',
});

const UserProfile = () => {
	const router = useRouter();

	const SentToEditProfile = () => {
		router.push('/EditProfile');
	};

	return (
		<View className='flex-row gap-3 justify-center items-center p-2'>
			<Text className='underline' onPress={SentToEditProfile}>
				Edit
			</Text>
			<Text className='bg-gray-500 h-8 w-8 text-xl text-center  rounded-full'>
				C
			</Text>
		</View>
	);
};

export default UserProfile;

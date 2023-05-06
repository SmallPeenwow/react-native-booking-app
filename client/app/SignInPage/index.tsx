import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import textShadowStyle from '../../styles/textShadowStyle';
import Input from '../../components/Input';

const index = () => {
	const router = useRouter();

	const SendToUserPage = () => {
		router.push('/UserPages');
	};

	const SendToBookingRequests = () => {
		router.push('/AdminPages');
	};

	return (
		<View className='h-full bg-white flex-col'>
			<View className='bg-main-color p-3 pt-12 pb-4'>
				<Text
					style={textShadowStyle.textShadow}
					className='text-white text-2xl font-bold'
				>
					Justin Bowden Biokineticist
				</Text>
			</View>

			<View className='flex-1 items-center justify-center'>
				<KeyboardAvoidingView behavior='height'>
					<View className='w-80 p-6 gap-4'>
						<View>
							<Text className='text-xl mb-2 font-semibold'>Email</Text>
							<Input placeholder='Enter your email..' />
						</View>
						<View>
							<Text className='text-xl mb-2 font-semibold'>Password</Text>
							<Input placeholder='Enter your password..' />
						</View>
						<View className='justify-end items-end'>
							<View className='w-28'>
								<Button title='Sign In' onPress={SendToBookingRequests} />
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>

			<StatusBar style='auto' />
		</View>
	);
};

export default index;

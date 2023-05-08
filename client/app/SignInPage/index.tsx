import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useState } from 'react';
import Header from '../../components/Header';
import textStyles from '../../styles/textStyles';

const index = () => {
	const router = useRouter();

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const SendToUserPage = () => {
		router.push('/UserPages');
	};

	const SendToBookingRequests = () => {
		router.push('/AdminPages');
	};

	return (
		<View className='h-full bg-white flex-col'>
			<Header />

			<View className='flex-1 items-center justify-center'>
				<ScrollView
					contentContainerStyle={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
					}}
				>
					<KeyboardAvoidingView behavior='height'>
						<View className='w-80 p-6 gap-4'>
							{/* TODO: make inputs all reusable */}
							<View>
								<Text className={textStyles.default}>Email</Text>
								<Input
									placeholder='Enter your email..'
									useStateChange={setUserEmail}
								/>
							</View>
							<View>
								<Text className={textStyles.default}>Password</Text>
								<Input
									placeholder='Enter your password..'
									useStateChange={setUserPassword}
								/>
							</View>
							<View className='justify-end items-end'>
								<View className='w-28'>
									<Button title='Sign In' onPress={SendToUserPage} />
								</View>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</View>

			<StatusBar style='auto' />
		</View>
	);
};

export default index;
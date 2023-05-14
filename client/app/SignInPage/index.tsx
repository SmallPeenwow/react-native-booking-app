import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useState } from 'react';
import Header from '../../components/Header';
import { getLoginAccess } from '../../services/login';
import ErrorMessage from '../../components/ErrorMessage';
import { z } from 'zod';

const index = () => {
	const router = useRouter();
	const schema = z.coerce.string();

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const [userAccess, setUserAccess] = useState<string | undefined>();
	('');

	//const getUserAccessFn = useAsyncFn(getUserAccess);

	const SendToUserPage = () => {
		router.push('/UserPages');
	};

	const SendToBookingRequests = () => {
		router.push('/AdminPages');
	};

	// function getUserAccess(email: string, password: string) {
	// 	return getUserAccessFn.execute({ email, password }).then((email: string, password: string) => {
	// 		getLoginAccess(access);
	// 	});
	// }

	const getUserAccess = async (email: string, password: string) => {
		// const {
		// 	loading,
		// 	error,
		// 	value: value,
		// } = useAsync(getLoginAccess(email, password));

		if (!schema.email(email)) {
			// Will do something for error message
			setIsError(true);
			setErrorMessage('Email is not valid format');
			return;
		}

		// Also need to do return message if not user
		const value: any = await getLoginAccess(email, password);
		setUserAccess(value.access_level);
	};

	return (
		<View className='h-full bg-white flex-col'>
			<Header />

			{isError && (
				<ErrorMessage
					message={errorMessage}
					isVisible={isError}
					activeStateChange={setIsError}
				/>
			)}

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
						<View className='w-80 p-6'>
							<Input
								title='Email'
								placeholder='Enter your Email..'
								useStateChange={setUserEmail}
							/>
							<Input
								title='Password'
								placeholder='Enter your Password..'
								useStateChange={setUserPassword}
							/>
							<View className='justify-end items-end'>
								<View className='w-28'>
									<Button
										title='Sign In'
										onPress={() => getUserAccess(userEmail, userPassword)}
									/>
								</View>
							</View>
							<Text>{userAccess}</Text>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</View>

			<StatusBar style='auto' />
		</View>
	);
};

export default index;

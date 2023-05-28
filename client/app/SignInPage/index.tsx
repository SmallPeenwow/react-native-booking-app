import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useState } from 'react';
import Header from '../../components/Header';
import { Login } from '../../services/login';
import ErrorMessage from '../../components/ErrorMessage';
import { SendToPage } from '../../hooks/SendToPage';
import { EmailValidation } from '../../hooks/EmailValidation';
import { SaveInStorage } from '../../hooks/LocalStorage/AsyncStorageSetItemId';
import { IsPasswordEmpty } from '../../hooks/SignInPage/IsPasswordEmpty';
import PasswordInput from '../../components/PasswordInput';

const index = () => {
	const { push } = SendToPage();

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const getUserAccess = async (email: string, password: string) => {
		if (!(await EmailValidation({ email: email }))) {
			setIsError(true);
			setErrorMessage('Email is not valid format');
			return;
		}

		console.log(password);

		if (await IsPasswordEmpty({ password: password })) {
			setIsError(true);
			setErrorMessage('Password must not be empty or contain spaces');
			return;
		}

		const value: any = await Login(email.toLowerCase(), password);

		if (value === null) {
			setIsError(true);
			setErrorMessage(
				'Check that your details are correct or make an Account.'
			);
			return;
		}

		// Maybe make hook
		if (value.access_level.toLowerCase() === 'admin') {
			await SaveInStorage(value.id);
			push('/AdminPages');
			return;
		} else if (value.access_level.toLowerCase() === 'client') {
			await SaveInStorage(value.id);
			push('/UserPages');
			return;
		}
		return;
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
					{isError && (
						<View className='absolute items-center z-20 bottom-[80%] w-3/4'>
							<ErrorMessage
								message={errorMessage}
								isError={isError}
								activeStateChange={setIsError}
							/>
						</View>
					)}
					<View className='w-80 p-6'>
						<Input
							title='Email'
							placeholder='Enter your Email..'
							useStateChange={setUserEmail}
						/>
						<PasswordInput
							title='Password'
							placeholder='Enter your Password..'
							useStateChange={setUserPassword}
						/>
						<View className='justify-end items-end mr-4'>
							<View className='w-32'>
								<Button
									title='Sign In'
									mainColor='main-color'
									onPress={() => getUserAccess(userEmail, userPassword)}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>

			<StatusBar style='auto' />
		</View>
	);
};

export default index;

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

const index = () => {
	const { push } = SendToPage();

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const getUserAccess = async (email: string, password: string) => {
		// The if and else if are used for testing offline
		if (
			email.toLowerCase() === 'client' &&
			password.toLowerCase() === 'client'
		) {
			push('/UserPages');
		} else if (
			email.toLowerCase() === 'admin' &&
			password.toLowerCase() === 'admin'
		) {
			push('/AdminPages');
		} else {
			if (!(await EmailValidation({ email: email }))) {
				setIsError(true);
				setErrorMessage('Email is not valid format');
				return;
			}

			const value: any = await Login(email.toLowerCase(), password);

			if (value === 'error') {
				setIsError(true);
				setErrorMessage(
					'Check that your details are correct or make an Account.'
				);
				return;
			}

			// Maybe make hook
			// TODO: pass id through with both sign in and up
			if (value.access_level.toLowerCase() === 'admin') {
				push('/AdminPages');
				return;
			} else if (value.access_level.toLowerCase() === 'client') {
				push('/UserPages');
				return;
			}
		}
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
						<ErrorMessage
							message={errorMessage}
							isError={isError}
							activeStateChange={setIsError}
						/>
					)}
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
						<View className='justify-end items-end mr-4'>
							<View className='w-32'>
								<Button
									title='Sign In'
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

import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useState } from 'react';
import Header from '../../components/Header';
import { Login } from '../../services/login';
import ErrorMessage from '../../components/ErrorMessage';
import { useSendToPage } from '../../hooks/useSendToPage';
import { useEmailValidation } from '../../hooks/useEmailValidation';
import { useSaveInStorage } from '../../hooks/LocalStorage/useAsyncStorageSetItemId';
import { useIsPasswordEmpty } from '../../hooks/SignInPage/useIsPasswordEmpty';
import PasswordInput from '../../components/PasswordInput';
import { useBackActionEvent } from '../../hooks/BackHandler/useBackActionEvent';
import LoadingDisplay from '../../components/LoadingDisplay';

type UserDetails = {
	access_level: string;
	address: string;
	id: number;
};

const index = () => {
	const { push } = useSendToPage();

	useBackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '..',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const getUserAccess = async (email: string, password: string) => {
		setIsLoading(true);

		if (!(await useEmailValidation({ email: email }))) {
			setIsLoading(false);
			setIsError(true);
			setErrorMessage('Email is not valid format');
			return;
		}

		if (await useIsPasswordEmpty({ password: password })) {
			setIsLoading(false);
			setIsError(true);
			setErrorMessage('Password must not be empty or contain spaces');
			return;
		}

		const value: UserDetails = await Login(email.toLowerCase(), password);

		if (value === null) {
			setIsLoading(false);
			setIsError(true);
			setErrorMessage(
				'Check that your details are correct or make an Account.'
			);
			return;
		}

		// Maybe make hook
		if (value.access_level.toLowerCase() === 'admin') {
			await useSaveInStorage(value.id);
			setIsLoading(false);
			push('/AdminPages');
			return;
		} else if (value.access_level.toLowerCase() === 'client') {
			await useSaveInStorage(value.id);
			setIsLoading(false);
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

					{isLoading && <LoadingDisplay header='Processing...' />}

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

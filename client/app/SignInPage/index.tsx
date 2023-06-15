import { View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useState } from 'react';
import Header from '../../components/Header';
import ErrorMessage from '../../components/ErrorMessage';
import { useSendToPage } from '../../hooks/useSendToPage';
import PasswordInput from '../../components/PasswordInput';
import LoadingDisplay from '../../components/LoadingDisplay';
import { useGetUserAccess } from '../../hooks/SignInPage/useGetUserAccess';
import signInStyles from '../../styles/SignInPage/styleSheet';

const index = () => {
	const { push } = useSendToPage();

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const GetUserAccess = async () => {
		const { getUserAccess } = useGetUserAccess({
			email: userEmail,
			password: userPassword,
			setIsLoading: setIsLoading,
			setIsError: setIsError,
			setErrorMessage: setErrorMessage,
			push: push,
		});

		await getUserAccess();
	};

	return (
		<View className='h-full bg-white flex-col'>
			<Header />

			<View className='flex-1 items-center justify-center'>
				<ScrollView contentContainerStyle={signInStyles.scrollView}>
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
								<Button title='Sign In' onPress={GetUserAccess} />
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

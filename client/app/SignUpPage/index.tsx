import { ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useState } from 'react';
import DateOfBirth from '../../components/DateOfBirth';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { useValidateUserDetails } from '../../hooks/SignUpPage/useValidateUserDetails';
import { CreateAccount } from '../../services/createAccount';
import { useSendToPage } from '../../hooks/useSendToPage';
import PasswordInput from '../../components/PasswordInput';
import { useSaveInStorage } from '../../hooks/LocalStorage/useAsyncStorageSetItemId';
import { useBackActionEvent } from '../../hooks/BackHandler/useBackActionEvent';
import LoadingDisplay from '../../components/LoadingDisplay';

const SignUp = () => {
	const { push } = useSendToPage();

	useBackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '..',
	});

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [password, setPassword] = useState('');
	const [cellNumber, setCellNumber] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const addUserDetails = async (
		cellNumber: string,
		email: string,
		password: string,
		name: string,
		surname: string,
		dateOfBirth: Date
	) => {
		setIsLoading(true);
		const { errorResult, responseMessage } = await useValidateUserDetails({
			cellNumber: cellNumber,
			email: email,
			password: password,
			username: name,
			dateOfBirth: dateOfBirth,
		});

		//TODO: test sign up again
		if (!errorResult) {
			const value: any | undefined = await CreateAccount(
				name,
				surname,
				email.toLowerCase(),
				password,
				cellNumber.replace(/\s/g, ''),
				dateOfBirth
			);

			if (value.access_level.toLowerCase() === 'client') {
				await useSaveInStorage(value.id);
				setIsLoading(false);
				push('/UserPages');
				return;
			}
		}

		setIsLoading(false);
		setIsError(errorResult);
		setErrorMessage(responseMessage);
		return;
	};

	return (
		<View className='h-full relative w-full bg-white flex-col'>
			<Header />
			{/* // TODO: Fix error message to be one without view */}
			{isError && (
				<View className='absolute items-center z-50 top-1/3 w-full'>
					<ErrorMessage
						message={errorMessage}
						isError={isError}
						activeStateChange={setIsError}
					/>
				</View>
			)}

			{isLoading && <LoadingDisplay header='Processing...' />}

			<ScrollView
				contentContainerStyle={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View className='flex-1 w-72 justify-center'>
					<View className='flex-row items-center'>
						<Input
							title='Name'
							placeholder='Enter your Name...'
							useStateChange={setName}
						/>
						<Text className='text-red-600 ml-4 text-2xl'>*</Text>
					</View>
					<View className='border-2 border-black rounded my-3'></View>
					<Input
						title='Surname'
						placeholder='Enter your Surname...'
						useStateChange={setSurname}
					/>
					<View className='border-2 border-black rounded my-3'></View>
					<View className='flex-row items-center'>
						<Input
							title='Email'
							placeholder='Enter your Email...'
							useStateChange={setEmail}
						/>
						<Text className='text-red-600 ml-4 text-2xl'>*</Text>
					</View>
					<View className='border-2 border-black rounded my-3'></View>
					<View className='bg-gray-300 p-1 pl-3 rounded'>
						<Text className='text-xs '>
							Password must be equal or greater than 7 letters.{' \n'}
							Have a Capital letter, Number, Special character.
						</Text>
					</View>
					<View className='flex-row items-center'>
						<PasswordInput
							title='Password'
							placeholder='Enter your Password...'
							useStateChange={setPassword}
						/>
						<Text className='text-red-600 ml-4 text-2xl'>*</Text>
					</View>
					<View className='border-2 border-black rounded my-3'></View>
					<DateOfBirth
						title='Date of Birth'
						placeholder='Enter your Date of Birth...'
						dateSelected={dateOfBirth}
						useStateChange={setDateOfBirth}
					/>
					<View className='border-2 border-black rounded my-3'></View>
					<Input
						title='Cell Number'
						placeholder='Enter your Cell Number...'
						useStateChange={setCellNumber}
					/>
					<View className='border-2 border-black rounded mt-3'></View>
					<View className='justify-end items-end mb-10'>
						<View className='w-36'>
							<Button
								title='Sign Up'
								onPress={() =>
									addUserDetails(
										cellNumber,
										email,
										password,
										name,
										surname,
										dateOfBirth
									)
								}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default SignUp;

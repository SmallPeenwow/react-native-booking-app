import { ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useState } from 'react';
import DateOfBirth from '../../components/DateOfBirth';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { useSendToPage } from '../../hooks/useSendToPage';
import PasswordInput from '../../components/PasswordInput';
import LoadingDisplay from '../../components/LoadingDisplay';
import { useAddUserDetails } from '../../hooks/SignUpPage/useAddUserDetails';

const SignUp = () => {
	const { push } = useSendToPage();

	// FUTURE FIX: Maybe have cell number required or do no validation check
	// FUTURE FIX: Maybe display what special characters can be used

	const [name, setName] = useState<string>('');
	const [surname, setSurname] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
	const [password, setPassword] = useState<string>('');
	const [cellNumber, setCellNumber] = useState<string>('');

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const AddUserDetails = async () => {
		const { addUserDetails } = useAddUserDetails({
			name: name,
			surname: surname,
			email: email,
			dateOfBirth: dateOfBirth,
			password: password,
			cellNumber: cellNumber,
			setIsLoading: setIsLoading,
			setIsError: setIsError,
			setErrorMessage: setErrorMessage,
			push: push,
		});

		await addUserDetails();
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
					<View className='border border-black rounded my-3'></View>
					<Input
						title='Surname'
						placeholder='Enter your Surname...'
						useStateChange={setSurname}
					/>
					<View className='border border-black rounded my-3'></View>
					<View className='flex-row items-center'>
						<Input
							title='Email'
							placeholder='Enter your Email...'
							useStateChange={setEmail}
						/>
						<Text className='text-red-600 ml-4 text-2xl'>*</Text>
					</View>
					<View className='border border-black rounded my-3'></View>
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
					<View className='border border-black rounded my-3'></View>
					<DateOfBirth
						title='Date of Birth'
						placeholder='Enter your Date of Birth...'
						dateSelected={dateOfBirth}
						useStateChange={setDateOfBirth}
					/>
					<View className='border border-black rounded my-3'></View>
					<Input
						title='Cell Number'
						placeholder='Enter your Cell Number...'
						useStateChange={setCellNumber}
					/>
					<View className='border border-black rounded mt-3'></View>
					<View className='justify-end items-end mb-10'>
						<View className='w-36'>
							<Button title='Sign Up' onPress={AddUserDetails} />
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default SignUp;

import { ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useState } from 'react';
import DateOfBirth from '../../components/DateOfBirth';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { validateUserDetails } from '../../hooks/SignUpPage/validateUserDetails';
import { CreateAccount } from '../../services/createAccount';
import { SendToPage } from '../../hooks/SendToPage';

const SignUp = () => {
	const { push } = SendToPage();

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [password, setPassword] = useState('');
	const [cellNumber, setCellNumber] = useState('');

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	//TODO: fix up positions and spacing for both sign in and up
	// TODO: date running into error when switching doesn't go to correct number
	const addUserDetails = async (
		cellNumber: string,
		email: string,
		password: string,
		name: string,
		surname: string,
		dateOfBirth: Date
	) => {
		const { errorResult, responseMessage } = await validateUserDetails({
			cellNumber: cellNumber,
			email: email,
			password: password,
			username: name,
			dateOfBirth: dateOfBirth,
		});

		if (!errorResult) {
			const value: any | undefined = await CreateAccount(
				name,
				surname,
				email.toLowerCase(),
				password,
				cellNumber,
				dateOfBirth
			);

			if (value.access_level.toLowerCase() === 'client') {
				push('/UserPages');
				return;
			}
		}

		setIsError(errorResult);
		setErrorMessage(responseMessage);
		return;
	};

	return (
		<View className='h-full relative w-full bg-white flex-col'>
			<Header />
			{isError && (
				<View className='absolute items-center z-50 top-1/3 w-full'>
					<ErrorMessage
						message={errorMessage}
						isError={isError}
						activeStateChange={setIsError}
					/>
				</View>
			)}

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
							Password must be 7 characters.{' \n'}
							Have a Capital letter, Number, Special character.
						</Text>
					</View>
					<View className='flex-row items-center'>
						<Input
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
					<View className='justify-end items-end mb-3'>
						<View className='w-28'>
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

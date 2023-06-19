import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Input from '../Input';
import RequiredIcon from './RequiredIcon';
import LineSeparator from './LineSeparator';
import PasswordInput from '../PasswordInput';
import DateOfBirth from '../DateOfBirth';
import { useAddUserDetails } from '../../hooks/SignUpPage/useAddUserDetails';
import { useSendToPage } from '../../hooks/useSendToPage';
import Button from '../Button';

type SignUpFormProps = {
	setIsLoading: (action: boolean) => void;
	setIsError: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
};

const SignUpForm = ({
	setIsLoading,
	setIsError,
	setErrorMessage,
}: SignUpFormProps) => {
	const { push } = useSendToPage();

	// FUTURE FIX: Maybe display what special characters can be used

	const [name, setName] = useState<string>('');
	const [surname, setSurname] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
	const [password, setPassword] = useState<string>('');
	const [cellNumber, setCellNumber] = useState<string>('');

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
		<View className='flex-1 w-72 justify-center'>
			<View className='flex-row items-center'>
				<Input
					title='Name'
					placeholder='Enter your Name...'
					useStateChange={setName}
				/>
				<RequiredIcon />
			</View>
			<LineSeparator />
			<Input
				title='Surname'
				placeholder='Enter your Surname...'
				useStateChange={setSurname}
			/>
			<LineSeparator />
			<View className='flex-row items-center'>
				<Input
					title='Email'
					placeholder='Enter your Email...'
					useStateChange={setEmail}
				/>
				<RequiredIcon />
			</View>
			<LineSeparator />
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
				<RequiredIcon />
			</View>
			<LineSeparator />
			<View className='flex-row items-center'>
				<DateOfBirth
					title='Date of Birth'
					placeholder='Enter your Date of Birth...'
					dateSelected={dateOfBirth}
					useStateChange={setDateOfBirth}
				/>
				<RequiredIcon />
			</View>
			<LineSeparator />
			<View className='flex-row items-center'>
				<Input
					title='Cell Number'
					placeholder='Enter your Cell Number...'
					useStateChange={setCellNumber}
				/>
				<RequiredIcon />
			</View>
			<LineSeparator />
			<View className='justify-end items-end mb-10'>
				<View className='w-36'>
					<Button title='Sign Up' onPress={AddUserDetails} />
				</View>
			</View>
		</View>
	);
};

export default SignUpForm;

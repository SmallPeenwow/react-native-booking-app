import { ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useState } from 'react';
import DateOfBirth from '../../components/DateOfBirth';
import Button from '../../components/Button';
import { EmailValidation } from '../../hooks/EmailValidation';

const SignUp = () => {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	// TODO: will either need to do some value check to make sure new date will be null when entered into database or convert to string or leave note for user
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [password, setPassword] = useState('');
	const [cellNumber, setCellNumber] = useState('');

	//TODO: fix up positions and spacing for both sign in and up
	// TODO: make sure client knows what must be required for database
	const addUserDetails = async () => {
		if (await EmailValidation({ email: email })) {
			// For dateOfBirth do custom string before submit
			// age, surname, cell number can be null
			// Do validation on cell still
		}

		return;
	};

	return (
		<View className='h-full bg-white flex-col'>
			<View className='hidden'>
				<Text>Will contain error message to display in middle</Text>
			</View>
			<Header />

			<ScrollView
				contentContainerStyle={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View className='flex-1  justify-center'>
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
							<Button title='Sign In' onPress={() => addUserDetails} />
						</View>
					</View>
				</View>
				<Text>{new Date().getUTCFullYear()}</Text>
				<Text>{new Date().getUTCMonth()}</Text>
				<Text>{new Date().getUTCDay()}</Text>
			</ScrollView>
		</View>
	);
};

export default SignUp;

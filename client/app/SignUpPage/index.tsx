import { ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useState } from 'react';
import DateOfBirth from '../../components/DateOfBirth';

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

	return (
		<View className='h-full bg-white flex-col'>
			<Header />

			<ScrollView
				contentContainerStyle={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View className='flex-1  justify-center'>
					<Input
						title='Name'
						placeholder='Enter your Name...'
						useStateChange={setName}
					/>
					<View className='border-2 border-black rounded my-3'></View>
					<Input
						title='Surname'
						placeholder='Enter your Surname...'
						useStateChange={setSurname}
					/>
					<View className='border-2 border-black rounded my-3'></View>
					<Input
						title='Email'
						placeholder='Enter your Email...'
						useStateChange={setEmail}
					/>
					<View className='border-2 border-black rounded my-3'></View>
					<Input
						title='Password'
						placeholder='Enter your Password...'
						useStateChange={setPassword}
					/>
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
					<View className='border-2 border-black rounded my-3'></View>
					<Text>{dateOfBirth.toLocaleDateString()}</Text>
					<Text>{new Date().toLocaleDateString()}</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default SignUp;

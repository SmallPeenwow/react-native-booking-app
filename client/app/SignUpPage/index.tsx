import { KeyboardAvoidingView, ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useState } from 'react';
import DateOfBirth from '../../components/DateOfBirth';

const SignUp = () => {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [password, setPassword] = useState('');
	const [cellNumber, setCellNumber] = useState('');
	//TODO: fix up positions and spacing for both sign in and up
	return (
		<View className='h-full bg-white flex-col'>
			<Header />

			<ScrollView
				contentContainerStyle={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
				}}
			>
				<View className='flex-1 items-center justify-center'>
					<KeyboardAvoidingView behavior='height'>
						<Input
							title='Name'
							placeholder='Enter your Name...'
							useStateChange={setName}
						/>
						<Input
							title='Surname'
							placeholder='Enter your Surname...'
							useStateChange={setSurname}
						/>
						<Input
							title='Email'
							placeholder='Enter your Email...'
							useStateChange={setEmail}
						/>
						<Input
							title='Password'
							placeholder='Enter your Password...'
							useStateChange={setPassword}
						/>
						<DateOfBirth
							title='Date of Birth'
							placeholder='Enter your Date of Birth...'
							useStateChange={setDateOfBirth}
						/>
						<Input
							title='Cell Number'
							placeholder='Enter your Cell Number...'
							useStateChange={setCellNumber}
						/>
					</KeyboardAvoidingView>
				</View>
				<Text>{dateOfBirth}</Text>
			</ScrollView>
		</View>
	);
};

export default SignUp;

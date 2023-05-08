import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useState } from 'react';

type UserSignUpDetails = {
	name: string | undefined;
	surname: string | undefined;
	email: string | undefined;
	dateOfBirth: string | undefined;
	password: string | undefined;
	cellNumber: string | undefined;
};

const SignUp = () => {
	const [userDetails, setUserDetails] = useState<UserSignUpDetails>({
		name: '',
		surname: '',
		email: '',
		dateOfBirth: '',
		password: '',
		cellNumber: '',
	});

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [password, setPassword] = useState('');
	const [cellNumber, setCellNumber] = useState('');

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
						<Input placeholder='Enter your Name...' useStateChange={setName} />
						<Input
							placeholder='Enter your Surname...'
							useStateChange={setSurname}
						/>
						<Input
							placeholder='Enter your Email...'
							useStateChange={setEmail}
						/>
						<Input
							placeholder='Enter your Password...'
							useStateChange={setPassword}
						/>
						<Input
							placeholder='Enter your Date of Birth...'
							useStateChange={setDateOfBirth}
						/>
						<Input
							placeholder='Enter your Cell Number...'
							useStateChange={setCellNumber}
						/>
					</KeyboardAvoidingView>
				</View>
			</ScrollView>
		</View>
	);
};

export default SignUp;

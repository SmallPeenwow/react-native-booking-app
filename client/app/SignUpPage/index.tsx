import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import Header from '../../components/Header';
import textStyles from '../../styles/textStyles';
import Input from '../../components/Input';
import { useState } from 'react';

type UserSignUpDetails = {
	name: string | undefined;
	surname: string | undefined;
	email: string | undefined;
	dateOfBirth: Date;
	password: string | undefined;
	cellNumber: string | undefined;
};

const SignUp = () => {
	const [userDetails, setUserDetails] = useState<UserSignUpDetails>({
		name: '',
		surname: '',
		email: '',
		dateOfBirth: new Date(),
		password: '',
		cellNumber: '',
	});

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
						<View>
							<Text className={textStyles.default}>Name</Text>
							{/* <Input
									placeholder='Enter your email..'
									useStateChange={setUserDetails})
								/> */}
						</View>
						<View>
							<Text className={textStyles.default}>Surname</Text>
							{/* <Input
									placeholder='Enter your email..'
									useStateChange={setUserDetails})
								/> */}
						</View>
						<View>
							<Text className={textStyles.default}>Date Of Birth</Text>
							{/* <Input
									placeholder='Enter your email..'
									useStateChange={setUserDetails})
								/> */}
						</View>
						<View>
							<Text className={textStyles.default}>Email</Text>
							{/* <Input
									placeholder='Enter your email..'
									useStateChange={setUserDetails})
								/> */}
						</View>
						<View>
							<Text className={textStyles.default}>Password</Text>
							{/* <Input
									placeholder='Enter your email..'
									useStateChange={setUserDetails})
								/> */}
						</View>
						<View>
							<Text className={textStyles.default}>Cell Number</Text>
							{/* <Input
									placeholder='Enter your email..'
									useStateChange={setUserDetails})
								/> */}
						</View>
					</KeyboardAvoidingView>
				</View>
			</ScrollView>
		</View>
	);
};

export default SignUp;

import { ScrollView, View } from 'react-native';
import Header from '../../components/Header';
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingDisplay from '../../components/LoadingDisplay';
import SignUpForm from '../../components/SignUp/SignUpForm';

const SignUp = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

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

			{isLoading && <LoadingDisplay header='Processing...' />}

			<ScrollView
				contentContainerStyle={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<SignUpForm
					setIsLoading={setIsLoading}
					setIsError={setIsError}
					setErrorMessage={setErrorMessage}
				/>
			</ScrollView>
		</View>
	);
};

export default SignUp;

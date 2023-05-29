import { Stack } from 'expo-router';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';
import { useState, useCallback, useMemo, useEffect } from 'react';
import Button from '../../components/Button';
import { Fetch } from '../../hooks/EditProfile/Fetch';
import CancelButton from '../../components/CancelButton';
import EditProfileInput from '../../components/EditProfile/EditProfileInput';
import ErrorMessage from '../../components/ErrorMessage';

const index = () => {
	//TODO: make custom inputs for here and cancel button
	// TODO: maybe make a thing to check for change when user does input
	const [userEmailEdit, setUserEmailEdit] = useState('');
	const [userCellNumberEdit, setUserCellNumberEdit] = useState('');
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/UserPages',
	});

	const UserDetailsEmpty = () => {
		setUserEmailEdit('');
		setUserCellNumberEdit('');
	};

	const SaveDetails = async () => {
		setIsLoading(true);
		console.log(userEmailEdit, ' new');
		console.log(userCellNumberEdit, ' new');
		const { email, cellNumber } = await Fetch();
		console.log(email, ' old');
		console.log(cellNumber, ' old');

		// Do hook for validation check
		if (email === userEmailEdit.toLocaleLowerCase()) {
			setIsLoading(false);
			setIsError(true);
			setErrorMessage('Email is same as old email');
			return;
		}

		setIsLoading(false);
	};

	return (
		<View className='h-full bg-neutral-50'>
			<Stack.Screen
				options={{
					headerTitle: 'Edit Profile',
					headerTitleAlign: 'center',
				}}
			/>
			{isError && (
				<View className='absolute items-center z-50 top-1/4 w-full'>
					<ErrorMessage
						message={errorMessage}
						isError={isError}
						activeStateChange={setIsError}
					/>
				</View>
			)}

			{isLoading && (
				<View className='absolute items-center h-full z-50 top-1/2 w-full'>
					<ActivityIndicator
						size='large'
						style={{ transform: [{ scaleX: 3 }, { scaleY: 3 }] }}
						color='#0085FF'
					/>
				</View>
			)}

			<ScrollView>
				<View className='items-start border-b-main-color border-b-2'>
					<Text className='bg-blue-100 py-4 px-2 w-full text-base font-semibold'>
						You can change your email here.{'\n'}
						<Text className='text-sm w-10 font-normal'>
							<Text className='text-red-600'>NB</Text>: Changing your email will
							also mean you will need to use the new email when Signing In.
						</Text>
					</Text>
					<View className='items-center w-full justify-center'>
						<EditProfileInput
							placeholder='Update Email'
							inputValue={userEmailEdit}
							useStateChange={setUserEmailEdit}
						/>
					</View>
				</View>
				<View className='items-start border-b-main-color border-b-2'>
					<Text className='bg-blue-100 py-4 px-2 w-full text-base font-semibold'>
						You can change your cell number here.
					</Text>
					<View className='items-center w-full justify-center'>
						<EditProfileInput
							placeholder='Update Cell Number'
							inputValue={userCellNumberEdit}
							useStateChange={setUserCellNumberEdit}
						/>
					</View>
				</View>
				<View className='justify-around h-28 flex-row w-full'>
					<View>
						<Button title='Save' onPress={SaveDetails} />
					</View>
					<View>
						<CancelButton title='Cancel' onPress={UserDetailsEmpty} />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default index;

import { Stack } from 'expo-router';
import { ScrollView, Text, View, Alert } from 'react-native';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';
import { useState } from 'react';
import Button from '../../components/Button';
import { Fetch } from '../../hooks/EditProfile/Fetch';
import CancelButton from '../../components/CancelButton';
import EditProfileInput from '../../components/EditProfile/EditProfileInput';
import ErrorMessage from '../../components/ErrorMessage';
import { SendToPage } from '../../hooks/SendToPage';
import { ValidationUpdateCheck } from '../../hooks/EditProfile/ValidationUpdateCheck';
import LoadingDisplay from '../../components/LoadingDisplay';
import { updateUserDetails } from '../../services/EditProfile/updateUserDetails';
import { useAsyncStorageRetrieve } from '../../hooks/LocalStorage/useAsyncStorageRetrieve';
import SuccessfulMessage from '../../components/SuccessfulMessage';
import { UserStorage } from '../../shared/interfaces/userStorage.interface';

const index = () => {
	const [userEmailEdit, setUserEmailEdit] = useState('');
	const [userCellNumberEdit, setUserCellNumberEdit] = useState('');
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const { push } = SendToPage();

	// Maybe do page: '..'
	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/UserPages',
	});

	const CancelAction = () => {
		Alert.alert('Cancel', 'Are you sure you want to cancel?', [
			{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: 'Yes',
				onPress: () => {
					setUserEmailEdit('');
					setUserCellNumberEdit('');
					push('..');
				},
			},
		]);
	};

	const SaveAction = () => {
		if (userEmailEdit === '' && userCellNumberEdit === '') {
			setIsError(true);
			setErrorMessage('No changes were made.');
			return;
		}

		Alert.alert('Save', 'Do you want to save changes made?', [
			{ text: 'No', onPress: () => {}, style: 'cancel' },
			{
				text: 'Yes',
				onPress: () => {
					SaveDetails();
				},
			},
		]);
	};

	const SaveDetails = async () => {
		setIsLoading(true);

		const { oldEmail, oldCellNumber } = await Fetch();

		const { errorTrue, responseMessage } = await ValidationUpdateCheck({
			email: userEmailEdit.toLocaleLowerCase(),
			cellNumber: userCellNumberEdit,
			oldEmail: oldEmail,
			oldCellNumber: oldCellNumber,
		});

		if (!errorTrue) {
			const userInfo: string | null = await useAsyncStorageRetrieve(
				'Justin-Bowden-booking-application-id'
			);

			if (userInfo === null) {
				setIsError(true);
				setErrorMessage('Local Storage Error');
				return;
			}

			let userId: UserStorage = JSON.parse(userInfo);

			await updateUserDetails(
				userId.id,
				userEmailEdit === '' ? oldEmail : userEmailEdit.toLowerCase(),
				userCellNumberEdit === ''
					? oldCellNumber.toString()
					: userCellNumberEdit
			);

			setIsSuccess(true);
			setIsLoading(false);
		}

		setIsLoading(false);
		setIsError(errorTrue);
		setErrorMessage(responseMessage);
	};

	return (
		<View className='h-full bg-white'>
			<Stack.Screen
				options={{
					headerTitle: 'Edit Profile',
					headerTitleAlign: 'center',
					headerTitleStyle: { color: 'white' },
					headerTintColor: 'white',
					headerStyle: { backgroundColor: '#0085FF' },
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

			{isLoading && <LoadingDisplay header='Processing...' />}
			{isSuccess && (
				<SuccessfulMessage
					title='Update Was Successful'
					isSuccess={isSuccess}
					setIsSuccess={setIsSuccess}
				/>
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
						You can change your cell number here.{'\n'}
						<Text className='text-sm w-10 font-normal'>
							<Text className='text-red-600'>NB</Text>: You won't be allowed to
							add spacing.{'\n'}Eg: 0781234567
						</Text>
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
						<Button title='Save' onPress={SaveAction} />
					</View>
					<View>
						<CancelButton title='Cancel' onPress={CancelAction} />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default index;

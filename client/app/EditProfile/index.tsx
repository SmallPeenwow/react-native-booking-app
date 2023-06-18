import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import Button from '../../components/Button';
import CancelButton from '../../components/CancelButton';
import ErrorMessage from '../../components/ErrorMessage';
import { useSendToPage } from '../../hooks/useSendToPage';
import LoadingDisplay from '../../components/LoadingDisplay';
import SuccessfulMessage from '../../components/SuccessfulMessage';
import EditSections from '../../components/EditProfile/EditSections';
import { useCancelAction } from '../../hooks/EditProfile/useCancelAction';
import { useSaveAction } from '../../hooks/EditProfile/useSaveAction';
import { useSaveDetails } from '../../hooks/EditProfile/useSaveDetails';
import { COLORS as colorSet } from '../../constants/theme';

const Index = () => {
	const [userEmailEdit, setUserEmailEdit] = useState('');
	const [userCellNumberEdit, setUserCellNumberEdit] = useState('');
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const { push } = useSendToPage();

	const CancelAction = () => {
		useCancelAction({
			setUserEmailEdit: setUserEmailEdit,
			setUserCellNumberEdit: setUserCellNumberEdit,
			push: push,
		});
	};

	const SaveAction = () => {
		const { SaveDetails } = useSaveDetails({
			userEmailEdit: userEmailEdit,
			userCellNumberEdit: userCellNumberEdit,
			setErrorMessage: setErrorMessage,
			setUserEmailEdit: setUserEmailEdit,
			setUserCellNumberEdit: setUserCellNumberEdit,
			setIsError: setIsError,
			setIsLoading: setIsLoading,
			setIsSuccess: setIsSuccess,
		});

		useSaveAction({
			userEmailEdit: userEmailEdit,
			userCellNumberEdit: userCellNumberEdit,
			setIsError: setIsError,
			setErrorMessage: setErrorMessage,
			SaveDetails: SaveDetails,
		});
	};

	return (
		<View className='h-full bg-white'>
			<Stack.Screen
				options={{
					headerTitle: 'Edit Profile',
					headerTitleAlign: 'center',
					headerTitleStyle: { color: colorSet.white },
					headerTintColor: colorSet.white,
					headerStyle: { backgroundColor: colorSet.primary },
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
				<EditSections
					title={'You can change your email here.\n'}
					infoText={
						': Changing your email will also mean you will need to use the new email when Signing In.'
					}
					placeholderText='Update Email'
					inputValue={userEmailEdit}
					stateChange={setUserEmailEdit}
				/>

				<EditSections
					title={'You can change your cell number here.\n'}
					infoText={": You won't be allowed to add spacing.\nEg: 0781234567"}
					placeholderText='Update Cell Number'
					inputValue={userCellNumberEdit}
					stateChange={setUserCellNumberEdit}
				/>

				<View className='justify-around h-28 flex-row w-full'>
					<View>
						<CancelButton title='Cancel' onPress={CancelAction} />
					</View>
					<View>
						<Button title='Save' onPress={SaveAction} />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default Index;

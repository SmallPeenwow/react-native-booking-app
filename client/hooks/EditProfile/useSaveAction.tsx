import { Alert } from 'react-native';

type useSaveActionProps = {
	userEmailEdit: string;
	userCellNumberEdit: string;
	setIsError: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
	SaveDetails: () => Promise<void>;
};

export const useSaveAction = ({
	userEmailEdit,
	userCellNumberEdit,
	setIsError,
	setErrorMessage,
	SaveDetails,
}: useSaveActionProps) => {
	if (userEmailEdit === '' && userCellNumberEdit === '') {
		setIsError(true);
		setErrorMessage('No changes were made.');
		return;
	}

	Alert.alert('Save', 'Do you want to save changes made?', [
		{ text: 'No', onPress: () => {}, style: 'cancel' },
		{
			text: 'Yes',
			onPress: SaveDetails,
		},
	]);
};

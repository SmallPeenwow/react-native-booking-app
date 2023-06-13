import { Alert } from 'react-native';
import { Href } from 'expo-router/build/link/href';

type useCancelActionProps = {
	setUserEmailEdit: (action: string) => void;
	setUserCellNumberEdit: (action: string) => void;
	push: (href: Href) => void;
};

export const useCancelAction = ({
	setUserEmailEdit,
	setUserCellNumberEdit,
	push,
}: useCancelActionProps) => {
	const EmptyDetails = () => {
		setUserEmailEdit('');
		setUserCellNumberEdit('');
		push('..');
	};

	Alert.alert('Cancel', 'Are you sure you want to cancel?', [
		{
			text: 'Cancel',
			onPress: () => {},
			style: 'cancel',
		},
		{
			text: 'Yes',
			onPress: EmptyDetails,
		},
	]);
};

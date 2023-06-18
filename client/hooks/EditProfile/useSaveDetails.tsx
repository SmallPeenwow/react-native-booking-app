import { updateUserDetails } from '../../services/EditProfile/updateUserDetails';
import { UserStorage } from '../../shared/interfaces/userStorage.interface';
import { useAsyncStorageRetrieve } from '../LocalStorage/useAsyncStorageRetrieve';
import { useFetch } from './useFetch';
import { useValidationUpdateCheck } from './useValidationUpdateCheck';

type useSaveDetailsProps = {
	userEmailEdit: string;
	userCellNumberEdit: string;
	setErrorMessage: (action: string) => void;
	setUserEmailEdit: (action: string) => void;
	setUserCellNumberEdit: (action: string) => void;
	setIsError: (action: boolean) => void;
	setIsLoading: (action: boolean) => void;
	setIsSuccess: (action: boolean) => void;
};

export const useSaveDetails = ({
	userEmailEdit,
	userCellNumberEdit,
	setErrorMessage,
	setUserEmailEdit,
	setUserCellNumberEdit,
	setIsError,
	setIsSuccess,
	setIsLoading,
}: useSaveDetailsProps) => {
	const SaveDetails = async () => {
		setIsLoading(true);

		const { oldEmail, oldCellNumber } = await useFetch();

		const { errorTrue, responseMessage } = await useValidationUpdateCheck({
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

			await updateUserDetails({
				id: parseInt(userId.id),
				email: userEmailEdit === '' ? oldEmail : userEmailEdit.toLowerCase(),
				cellNumber:
					userCellNumberEdit === ''
						? oldCellNumber.toString()
						: userCellNumberEdit,
			});

			setUserEmailEdit('');
			setUserCellNumberEdit('');
			setIsSuccess(true);
			setIsLoading(false);
		}

		setIsLoading(false);
		setIsError(errorTrue);
		setErrorMessage(responseMessage);
	};

	return { SaveDetails };
};

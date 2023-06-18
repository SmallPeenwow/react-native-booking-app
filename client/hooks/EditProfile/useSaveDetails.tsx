import { updateUserDetails } from '../../services/EditProfile/updateUserDetails';
import { UserStorage } from '../../shared/interfaces/userStorage.interface';
import { useAsyncStorageRetrieve } from '../LocalStorage/useAsyncStorageRetrieve';
import { Fetch } from './Fetch';
import { ValidationUpdateCheck } from './ValidationUpdateCheck';

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

const useSaveDetails = ({
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
				parseInt(userId.id),
				userEmailEdit === '' ? oldEmail : userEmailEdit.toLowerCase(),
				userCellNumberEdit === ''
					? oldCellNumber.toString()
					: userCellNumberEdit
			);

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

export default useSaveDetails;

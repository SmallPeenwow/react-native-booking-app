import { CreateAccount } from '../../services/createAccount';
import { AddUserDetails } from '../../shared/types/addUserDetails.type';
import { useSaveInStorage } from '../LocalStorage/useAsyncStorageSetItemId';
import { useValidateUserDetails } from './useValidateUserDetails';
import { Href } from 'expo-router/build/link/href';

type useAddUserDetailsProps = {
	cellNumber: string;
	email: string;
	password: string;
	name: string;
	surname: string;
	dateOfBirth: Date;
	setIsLoading: (action: boolean) => void;
	setIsError: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
	push: (href: Href) => void;
};

export const useAddUserDetails = ({
	cellNumber,
	email,
	password,
	name,
	surname,
	dateOfBirth,
	setIsLoading,
	setIsError,
	setErrorMessage,
	push,
}: useAddUserDetailsProps) => {
	const addUserDetails = async () => {
		try {
			setIsLoading(true);
			const { errorResult, responseMessage } = await useValidateUserDetails({
				cellNumber: cellNumber,
				email: email,
				password: password,
				username: name,
				dateOfBirth: dateOfBirth,
			});

			if (!errorResult) {
				const value: AddUserDetails = await CreateAccount({
					name: name,
					surname: surname,
					email: email.toLowerCase(),
					password: password,
					cellNumber: cellNumber.replace(/\s/g, ''),
					dateOfBirth: dateOfBirth,
				});

				if (value.access_level.toLowerCase() === 'client') {
					await useSaveInStorage(value.id);
					setIsLoading(false);
					push('/UserPages');
					return;
				}
			}

			setIsLoading(false);
			setIsError(errorResult);
			setErrorMessage(responseMessage);
			return;
		} catch (error) {
			setIsLoading(false);
			setIsError(true);
			setErrorMessage('Sign Up Process Failed.');
		}
		return;
	};
	return { addUserDetails };
};

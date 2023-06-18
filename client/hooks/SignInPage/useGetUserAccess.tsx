import { Login } from '../../services/login';
import { UserDetails } from '../../shared/types/userDetails.type';
import { useSaveInStorage } from '../LocalStorage/useAsyncStorageSetItemId';
import { useEmailValidation } from '../useEmailValidation';
import { useIsPasswordEmpty } from './useIsPasswordEmpty';
import { Href } from 'expo-router/build/link/href';

type useGetUserAccessProps = {
	email: string;
	password: string;
	setIsLoading: (action: boolean) => void;
	setIsError: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
	push: (href: Href) => void;
};

export const useGetUserAccess = ({
	email,
	password,
	setIsLoading,
	setIsError,
	setErrorMessage,
	push,
}: useGetUserAccessProps) => {
	const getUserAccess = async () => {
		try {
			setIsLoading(true);

			if (!(await useEmailValidation({ email: email }))) {
				setIsLoading(false);
				setIsError(true);
				setErrorMessage('Email is not valid format');
				return;
			}

			if (await useIsPasswordEmpty({ password: password })) {
				setIsLoading(false);
				setIsError(true);
				setErrorMessage('Password must not be empty or contain spaces');
				return;
			}

			const value: UserDetails = await Login({
				email: email.toLowerCase(),
				password: password,
			});

			if (value === null) {
				setIsLoading(false);
				setIsError(true);
				setErrorMessage(
					'Check that your details are correct or make an Account.'
				);
				return;
			}

			if (value.access_level.toLowerCase() === 'admin') {
				await useSaveInStorage(value.id);
				setIsLoading(false);
				push('/AdminPages');
				return;
			} else if (value.access_level.toLowerCase() === 'client') {
				await useSaveInStorage(value.id);
				setIsLoading(false);
				push('/UserPages');
				return;
			}
		} catch (error) {
			setIsLoading(false);
			setIsError(true);
			setErrorMessage('Login Process Failed.');
		}
		return;
	};

	return { getUserAccess };
};

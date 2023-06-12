import { useRouter } from 'expo-router';

export const useSendToPage = () => {
	const router = useRouter();

	return {
		push: router.push,
	};
};

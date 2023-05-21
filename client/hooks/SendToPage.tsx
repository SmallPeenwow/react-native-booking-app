import { useRouter } from 'expo-router';

export const SendToPage = () => {
	const router = useRouter();

	return {
		push: router.push,
	};
};

import { Stack } from 'expo-router';
import { useBackActionEvent } from '../../hooks/BackHandler/useBackActionEvent';

export default function SignInLayout() {
	useBackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '..',
	});

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		/>
	);
}

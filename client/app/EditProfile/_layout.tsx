import { Stack } from 'expo-router';
import { useBackActionEvent } from '../../hooks/BackHandler/useBackActionEvent';

const _layout = () => {
	useBackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/UserPages',
	});

	return <Stack />;
};

export default _layout;

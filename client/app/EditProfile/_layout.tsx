import { Stack } from 'expo-router';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';

const _layout = () => {
	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/UserPages',
	});

	return <Stack />;
};

export default _layout;

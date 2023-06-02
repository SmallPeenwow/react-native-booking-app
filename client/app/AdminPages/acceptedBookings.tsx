import { Text, View } from 'react-native';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';

const AcceptedBookings = () => {
	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

	return (
		<View className='h-full bg-neutral-50'>
			<Text>Page Admin Can See What Booking They Have For Day Or Week</Text>
		</View>
	);
};

export default AcceptedBookings;

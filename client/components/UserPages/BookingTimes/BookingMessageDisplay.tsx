import { View, Text } from 'react-native';
import React from 'react';

type BookingMessageDisplayProps = {
	selected: string;
};

const BookingMessageDisplay = ({ selected }: BookingMessageDisplayProps) => {
	return (
		<View className='w-full items-center py-5 px-1'>
			<Text className='text-2xl capitalize'>
				You have no{' '}
				{selected === 'accept'
					? 'Accepted'
					: selected === 'decline'
					? 'Declined'
					: 'Pending'}{' '}
				Bookings.
			</Text>
		</View>
	);
};

export default BookingMessageDisplay;

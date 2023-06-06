import { View, Text } from 'react-native';

type DisplayTimeProps = {
	time: string;
};

const DisplayTime = ({ time }: DisplayTimeProps) => {
	return (
		<View className='bg-blue-400 w-full p-2 h-10 border-t-0 border-[1px] border-black border-l-0'>
			<Text className='text-white font-semibold'>{time}</Text>
		</View>
	);
};

export default DisplayTime;

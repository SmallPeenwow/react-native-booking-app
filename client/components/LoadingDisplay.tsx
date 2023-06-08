import { ActivityIndicator, View, Text } from 'react-native';

type LoadingDisplayProps = {
	header: string;
};

const LoadingDisplay = ({ header }: LoadingDisplayProps) => {
	return (
		<View className='absolute items-center h-full z-[1000] top-1/3 w-full'>
			<View className='p-5 w-44 items-center bg-gray-500/80 rounded'>
				<View className='gap-5'>
					<Text className='text-lg text-white font-semibold'>{header}</Text>
					<ActivityIndicator
						size='large'
						style={{
							padding: 10,
							transform: [{ scaleX: 2 }, { scaleY: 2 }],
						}}
						color='#0085FF'
					/>
				</View>
			</View>
		</View>
	);
};

export default LoadingDisplay;

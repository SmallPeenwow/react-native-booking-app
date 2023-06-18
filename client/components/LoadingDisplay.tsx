import { ActivityIndicator, View, Text } from 'react-native';
import { COLORS as colorSet } from '../constants/theme';
import styles from '../styles/styleSheet';

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
						style={styles.activityIndicator}
						color={colorSet.primary}
					/>
				</View>
			</View>
		</View>
	);
};

export default LoadingDisplay;

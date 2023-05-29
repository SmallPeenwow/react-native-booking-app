import { Text, Pressable } from 'react-native';
import buttonStyles from '../styles/buttonStyles';

type CancelButtonProps = {
	title: string;
	onPress: () => void;
};

const CancelButton = ({ title, onPress }: CancelButtonProps) => {
	return (
		<Pressable
			className='mt-8 bg-cancel-button items-center rounded-md active:bg-white'
			style={buttonStyles.button}
			onPress={onPress}
		>
			{({ pressed }) => (
				<Text
					className={`${
						pressed ? 'text-cancel-button' : 'text-white'
					} w-36 py-3 text-center text-xl font-semibold`}
				>
					{title}
				</Text>
			)}
		</Pressable>
	);
};

export default CancelButton;

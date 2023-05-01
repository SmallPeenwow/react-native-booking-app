import { Text, Pressable } from 'react-native';
import buttonStyles from '../styles/buttonStyles';

import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
	default: 'native',
});

type ButtonProps = {
	title: string;
	onPress: () => void;
};

const Button = ({ title, onPress }: ButtonProps) => {
	return (
		<Pressable
			className='mt-8 bg-white rounded-md sh shadow-button-shadow active:bg-main-color'
			style={buttonStyles.button}
			onPress={onPress}
		>
			{({ pressed }) => (
				<Text
					className={`${
						pressed ? 'text-white' : 'text-main-color'
					} w-36 py-3 text-center text-xl font-semibold`}
				>
					{title}
				</Text>
			)}
		</Pressable>
	);
};

export default Button;

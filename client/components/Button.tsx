import { Text, Pressable } from 'react-native';
import buttonStyles from '../styles/buttonStyles';

type ButtonProps = {
	title: string;
	mainColor: string;
	onPress: () => void;
};

const Button = ({ title, mainColor, onPress }: ButtonProps) => {
	return (
		<Pressable
			className={`mt-8 bg-${mainColor} items-center rounded-md active:bg-white`}
			style={buttonStyles.button}
			onPress={onPress}
		>
			{({ pressed }) => (
				<Text
					className={`${
						pressed ? `text-${mainColor}` : 'text-white'
					} w-36 py-3 text-center text-xl font-semibold`}
				>
					{title}
				</Text>
			)}
		</Pressable>
	);
};

export default Button;

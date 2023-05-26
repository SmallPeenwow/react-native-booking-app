import { Text, Pressable } from 'react-native';
import buttonStyles from '../styles/buttonStyles';

type ButtonProps = {
	title: string;
	onPress: () => void;
};

const Button = ({ title, onPress }: ButtonProps) => {
	return (
		<Pressable
			className='mt-8 bg-main-color items-center rounded-md active:bg-white'
			style={buttonStyles.button}
			onPress={onPress}
		>
			{({ pressed }) => (
				<Text
					className={`${
						pressed ? 'text-main-color' : 'text-white'
					} w-36 py-3 text-center text-xl font-semibold`}
				>
					{title}
				</Text>
			)}
		</Pressable>
	);
};

export default Button;

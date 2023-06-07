import {
	NativeSyntheticEvent,
	TextInput,
	TextInputChangeEventData,
	View,
	Text,
} from 'react-native';
import textStyles from '../styles/textStyles';

type InputProps = {
	title: string;
	placeholder: string;
	useStateChange: (active: string) => void;
};

const Input = ({ title, placeholder, useStateChange }: InputProps) => {
	const OnChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		useStateChange(e.nativeEvent.text.trim());
	};

	return (
		<View className='gap-1 py-3'>
			<Text className={textStyles.default}>{title}</Text>
			<TextInput
				className='py-3 px-4 text-lg rounded-md bg-slate-100 border-2 border-gray-500 w-64'
				placeholder={placeholder}
				onChange={OnChangeText}
			/>
		</View>
	);
};

export default Input;

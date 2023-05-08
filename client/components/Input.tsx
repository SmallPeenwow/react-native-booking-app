import {
	NativeSyntheticEvent,
	TextInput,
	TextInputChangeEventData,
	View,
	Text,
} from 'react-native';
import textStyles from '../styles/textStyles';

type InputProps = {
	placeholder: string;
	useStateChange: (active: string) => void;
};

const Input = ({ placeholder, useStateChange }: InputProps) => {
	const onPlayerNameChange = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	) => {
		useStateChange(e.nativeEvent.text);
	};

	return (
		<View>
			<Text className={textStyles.default}>Email</Text>
			<TextInput
				className='py-3 px-4 text-lg rounded-md bg-slate-100 border-2 border-gray-500 w-64'
				placeholder={placeholder}
				onChange={onPlayerNameChange}
			/>
		</View>
	);
};

export default Input;

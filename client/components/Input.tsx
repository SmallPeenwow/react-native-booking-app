import {
	NativeSyntheticEvent,
	TextInput,
	TextInputChangeEventData,
} from 'react-native';

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
		<TextInput
			className='py-3 px-4 text-lg rounded-md bg-slate-100 border-2 border-gray-500 w-64'
			placeholder={placeholder}
			onChange={onPlayerNameChange}
		/>
	);
};

export default Input;

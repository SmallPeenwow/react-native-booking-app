import {
	NativeSyntheticEvent,
	TextInput,
	TextInputChangeEventData,
	View,
} from 'react-native';

type EditProfileInputProps = {
	placeholder: string;
	inputValue: string;
	useStateChange: (active: string) => void;
};

const EditProfileInput = ({
	placeholder,
	inputValue,
	useStateChange,
}: EditProfileInputProps) => {
	const onPlayerNameChange = (
		e: NativeSyntheticEvent<TextInputChangeEventData>
	) => {
		useStateChange(e.nativeEvent.text.trim());
	};

	return (
		<View className='py-8'>
			<TextInput
				className='py-3 px-4 text-lg rounded-md bg-slate-100 border-2 border-gray-500 w-64'
				placeholder={placeholder}
				onChange={onPlayerNameChange}
				value={inputValue}
			/>
		</View>
	);
};

export default EditProfileInput;

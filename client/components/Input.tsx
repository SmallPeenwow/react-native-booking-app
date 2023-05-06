import { TextInput, View } from 'react-native';

//TODO: send through function for on state change

type InputProps = {
	placeholder: string;
};

const Input = ({ placeholder }: InputProps) => {
	return (
		<TextInput
			className='py-3 px-4 text-lg rounded-md bg-slate-100 border-2 border-gray-500 w-64'
			placeholder={placeholder}
		/>
	);
};

export default Input;

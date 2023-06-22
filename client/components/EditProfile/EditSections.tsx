import { View, Text } from 'react-native';
import EditProfileInput from './EditProfileInput';

type EditSectionsProps = {
	title: string;
	infoText: string;
	inputValue: string;
	placeholderText: string;
	stateChange: (action: string) => void;
};

const EditSections = ({
	title,
	infoText,
	inputValue,
	placeholderText,
	stateChange,
}: EditSectionsProps) => {
	return (
		<View className='items-start border-b-main-color border-b-2'>
			<Text className='bg-blue-100 py-4 px-2 w-full text-base font-semibold'>
				{title}
				<Text className='text-sm w-10 font-normal'>
					<Text className='text-red-600'>NB</Text>
					{infoText}
				</Text>
			</Text>
			<View className='items-center w-full justify-center'>
				<EditProfileInput
					placeholder={placeholderText}
					inputValue={inputValue}
					useStateChange={stateChange}
				/>
			</View>
		</View>
	);
};

export default EditSections;

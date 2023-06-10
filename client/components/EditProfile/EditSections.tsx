import { View, Text } from 'react-native';
import EditProfileInput from './EditProfileInput';
import editSectionStyle from '../../styles/editSectionStyles';

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
		<View className={editSectionStyle.container}>
			<Text className={editSectionStyle.textContainer}>
				{title}
				<Text className={editSectionStyle.textInfoContainer}>
					<Text className={editSectionStyle.textNB}>NB</Text>
					{infoText}
				</Text>
			</Text>
			<View className={editSectionStyle.textInputContainer}>
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

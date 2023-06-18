import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSendToPage } from '../hooks/useSendToPage';
import { COLORS as colorSet } from '../constants/theme';

const UserProfile = () => {
	const { push } = useSendToPage();

	const SentToEditProfile = () => {
		push('EditProfile/');
	};

	return (
		<View className='pr-4'>
			<AntDesign
				onPress={SentToEditProfile}
				name='setting'
				size={30}
				color={colorSet.white}
			/>
		</View>
	);
};

export default UserProfile;

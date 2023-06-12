import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSendToPage } from '../hooks/useSendToPage';

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
				color='white'
			/>
		</View>
	);
};

export default UserProfile;

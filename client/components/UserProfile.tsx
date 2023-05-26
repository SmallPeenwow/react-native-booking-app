import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SendToPage } from '../hooks/SendToPage';

const UserProfile = () => {
	const { push } = SendToPage();

	const SentToEditProfile = () => {
		push('/EditProfile');
	};

	return (
		<View className='pr-4'>
			<AntDesign
				onPress={SentToEditProfile}
				name='setting'
				size={30}
				color='black'
			/>
		</View>
	);
};

export default UserProfile;

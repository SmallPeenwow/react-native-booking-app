import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';
import Input from '../../components/Input';
import { useState } from 'react';
import Button from '../../components/Button';

const index = () => {
	const [userEmailEdit, setUserEmailEdit] = useState('');
	const [userCellNumberEdit, setUserCellNumberEdit] = useState('');

	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/UserPages',
	});

	const UserDetailsEmpty = () => {
		setUserEmailEdit('');
		setUserCellNumberEdit('');
	};

	const SaveDetails = () => {
		console.log(userEmailEdit);
		console.log(userCellNumberEdit);
	};

	return (
		<View className='h-full bg-neutral-50'>
			<Stack.Screen
				options={{
					headerTitle: 'Edit Profile',
					headerTitleAlign: 'center',
				}}
			/>
			<ScrollView>
				<View className='items-start border-b-main-color border-b-2'>
					<Text className='bg-blue-100 py-4 px-2 w-full text-base font-semibold'>
						You can change your email here.{'\n'}
						<Text className='text-sm w-10 font-normal'>
							<Text className='text-red-600'>NB</Text>: Changing your email will
							also mean you will need to use the new email when Signing In.
						</Text>
					</Text>
					<View className='items-center w-full justify-center pb-8'>
						<Input
							title=''
							placeholder='Update Email'
							useStateChange={setUserEmailEdit}
						/>
					</View>
				</View>
				<View className='items-start border-b-main-color border-b-2'>
					<Text className='bg-blue-100 py-4 px-2 w-full text-base font-semibold'>
						You can change your cell number here.
					</Text>
					<View className='items-center w-full justify-center pb-8'>
						<Input
							title=''
							placeholder='Update Cell Number'
							useStateChange={setUserCellNumberEdit}
						/>
					</View>
				</View>
				<View className='justify-around h-28 flex-row w-full'>
					<View>
						<Button title='Save' mainColor='main-color' onPress={SaveDetails} />
					</View>
					<View>
						<Button
							title='Cancel'
							mainColor='red-600'
							onPress={UserDetailsEmpty}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default index;

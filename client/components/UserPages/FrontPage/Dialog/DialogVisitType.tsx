import {
	View,
	Text,
	TextInput,
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { COLORS as colorSet } from '../../../../constants/theme';

type DialogVisitTypeProps = {
	visitType: string;
	SetVisitType: (action: string) => void;
	OnChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
};

const DialogVisitType = ({
	visitType,
	SetVisitType,
	OnChangeText,
}: DialogVisitTypeProps) => {
	const SelectListData = [
		{ key: '1', value: 'office' },
		{ key: '2', value: 'home' },
	];

	return (
		<View className='flex-col h-32 justify-between border-b border-black p-1 pb-2'>
			<View className='flex-row h-10 items-center relative'>
				<Text className='text-base pl-[2px] font-semibold'>
					Select Visit Type:
				</Text>
				<View className='absolute z-50 right-0 top-0'>
					<SelectList
						setSelected={SetVisitType}
						data={SelectListData}
						placeholder='office'
						save='value'
						search={false}
						boxStyles={{ backgroundColor: colorSet.white }}
						dropdownStyles={{ backgroundColor: colorSet.white }}
					/>
				</View>
			</View>
			<View
				className={`flex-col items-start -z-10 ${
					visitType === 'office' ? 'hidden' : 'flex'
				}`}
			>
				<Text className='text-base font-semibold pb-1 pl-[2px]'>Address:</Text>
				<TextInput
					className='p-1 pl-2 rounded-md bg-slate-100 border-2 border-gray-500/50 w-full'
					placeholder='Enter Address...'
					onChange={OnChangeText}
				/>
			</View>
		</View>
	);
};

export default DialogVisitType;

import { View, Text } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { COLORS as colorSet } from '../../../constants/theme';
import { selectBookingType } from '../../../shared/types/selectBookingType.type';

type DropDownContainerProps = {
	SelectedState: (value: string) => void;
	dataArray: selectBookingType[];
};

const DropDownContainer = ({
	SelectedState,
	dataArray,
}: DropDownContainerProps) => {
	return (
		<View className='py-3 px-5 h-20 w-full items-center flex-row relative'>
			<View className='w-[40%] h-full items-center justify-start flex-row'>
				<Text className='font-semibold text-base capitalize'>Select type:</Text>
			</View>
			<View className='w-[60%] h-full relative'>
				<View className='transform w-full h-full translate-x-1/2 translate-y-1/2 absolute top-1'>
					<SelectList
						setSelected={SelectedState}
						data={dataArray}
						save='value'
						search={false}
						dropdownStyles={{ height: 165, backgroundColor: colorSet.white }}
					/>
				</View>
			</View>
		</View>
	);
};

export default DropDownContainer;

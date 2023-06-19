import { View, Text, ViewStyle } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

type DropDownSelectProps = {
	data: number[] | string[];
	placeholder: string;
	title: string;
	dropdownStyle: ViewStyle;
	zIndex: string;
	setSelect: (action: string) => void;
};

const DropDownSelect = ({
	data,
	placeholder,
	title,
	dropdownStyle,
	zIndex,
	setSelect,
}: DropDownSelectProps) => {
	return (
		<View
			className={`flex-row w-full h-16 items-center justify-around ${zIndex}`}
		>
			<View className='w-[40%] items-start'>
				<Text className='text-lg font-semibold'>{title}</Text>
			</View>
			<View className='w-[60%] h-full items-start relative justify-center'>
				<View className='top-2 absolute z-20'>
					<SelectList
						setSelected={setSelect}
						data={data}
						save='value'
						placeholder={placeholder}
						search={false}
						boxStyles={{ width: 200, backgroundColor: 'white' }}
						dropdownStyles={dropdownStyle}
					/>
				</View>
			</View>
		</View>
	);
};

export default DropDownSelect;

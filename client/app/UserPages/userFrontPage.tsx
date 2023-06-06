import { ScrollView, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import UserProfile from '../../components/UserProfile';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';
import { SelectList } from 'react-native-dropdown-select-list';
import { useCallback, useEffect, useState } from 'react';
import { useFetchWeeks } from '../../hooks/UserPages/FrontPage/useFetchWeeks';
import DisplayTime from '../../components/UserPages/FrontPage/DisplayTime';

const FrontPage = () => {
	const [month, setMonth] = useState<string>(
		new Date().toLocaleString('en-us', { month: 'long' })
	);
	const [weeks, setWeeks] = useState<string[][]>([]);
	const [year, setYear] = useState<string>(
		new Date().toLocaleString('en-us', { year: 'numeric' })
	);
	const [currentWeekDays, setCurrentWeekDays] = useState<string[]>([]);
	const [amountOfWeeks, setAmountOfWeeks] = useState<string[]>([]);
	// const [weekDisplayDays, setWeekDisplayDays] = useState<string[]>([]);
	const [show, setShow] = useState<boolean>(false);

	const yearArray = [
		new Date().getFullYear(),
		new Date().getFullYear() + 1,
		new Date().getFullYear() + 2,
	];

	const monthArrayNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const timeArrayNames = [
		'08:00 AM',
		'09:00 AM',
		'10:00 AM',
		'11:00 AM',
		'12:00 PM',
		'13:00 PM',
		'14:00 PM',
		'15:00 PM',
		'16:00 PM',
		'17:00 PM',
		'18:00 PM',
	];

	const SetDate = (weeks: string[][]) => {
		const date: string[] = [];

		weeks.map((value, index) => {
			let weekNumber: number = index + 1;
			date.push('Week ' + weekNumber);
		});

		setAmountOfWeeks(date);
	};

	const SelectYear = (value: string) => {
		setYear(value);
	};

	const SelectMonth = (value: string) => {
		setMonth(value);
	};

	// MAYBE put on _layout.tsx to see what happens
	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

	const handleFetch = () => {
		const { weeks } = useFetchWeeks({
			month: month,
			monthArrayNames: monthArrayNames,
			year: year,
		});
		return weeks;
	};

	// Runs multiply times
	useEffect(() => {
		const weeksFetched = handleFetch();

		setWeeks(weeksFetched);
		SetDate(weeksFetched);
	}, [month]);

	const SelectWeek = (value: string) => {
		let weekNumber: number = parseInt(value.split(' ')[1]);
		console.log(weekNumber);

		setCurrentWeekDays(weeks[weekNumber - 1]);
	};

	// console.log(year, ' year');
	// console.log(month, ' month');
	// console.log(weeks, ' weeks');
	// console.log(amountOfWeeks, ' amount');
	// console.log(currentWeekDays, ' current');

	return (
		<View className='h-full bg-white'>
			<Stack.Screen
				options={{
					headerTitle: 'Home',
					headerRight: () => <UserProfile />,
					headerTitleAlign: 'center',
					headerTitleStyle: { color: 'white' },
					headerStyle: { backgroundColor: '#0085FF' },
				}}
			/>

			<View className='h-full w-full flex-col items-center'>
				<View className='h-[25%] border-b-2 border-black w-full'>
					<ScrollView
						contentContainerStyle={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							marginTop: 15,
							padding: 8,
							height: 640,
						}}
					>
						<View className='flex-row w-full h-20 items-center justify-around z-50'>
							<View className='w-[40%] items-start'>
								<Text className='text-lg font-semibold'>Select Year:</Text>
							</View>
							<View className='w-[60%] h-full items-start relative'>
								<View className='top-5 absolute'>
									<SelectList
										setSelected={SelectYear}
										data={yearArray}
										save='value'
										placeholder={year}
										search={false}
										boxStyles={{ width: 200, backgroundColor: 'white' }}
										dropdownStyles={{ backgroundColor: 'white' }}
									/>
								</View>
							</View>
						</View>

						<View className='flex-row w-full h-20 items-center z-40'>
							<View className='w-[40%] items-start'>
								<Text className='text-lg font-semibold'>Select Month:</Text>
							</View>
							<View className='w-[60%] h-full items-start relative'>
								<View className='top-5 absolute z-50'>
									<SelectList
										setSelected={SelectMonth}
										data={monthArrayNames}
										save='value'
										placeholder={month}
										search={false}
										boxStyles={{ width: 200, backgroundColor: 'white' }}
										dropdownStyles={{
											backgroundColor: 'white',
											position: 'relative',
											top: 0,
											zIndex: 100,
											minHeight: 440,
										}}
									/>
								</View>
							</View>
						</View>

						<View className='flex-row w-full h-20 items-center justify-around'>
							<View className='w-[40%] items-start'>
								<Text className='text-lg font-semibold'>Select Week:</Text>
							</View>
							<View className='w-[60%] h-full items-start relative'>
								<View className='top-5 absolute z-50'>
									<SelectList
										setSelected={SelectWeek}
										data={amountOfWeeks}
										save='value'
										search={false}
										boxStyles={{ width: 200, backgroundColor: 'white' }}
										dropdownStyles={{
											backgroundColor: 'white',
											position: 'relative',
											top: 0,
											zIndex: 100,
										}}
									/>
								</View>
							</View>
						</View>
					</ScrollView>
				</View>

				<View className='h-[75%] w-full p-2'>
					<ScrollView
						contentContainerStyle={{
							paddingBottom: 20,
						}}
					>
						<View className='w-[80px]'>
							<View className='bg-blue-400 w-full p-2 h-10 border-[1px] border-black border-t-0 border-l-0'></View>
							{timeArrayNames.map((value, index) => (
								<DisplayTime time={value} key={index} />
							))}
						</View>
					</ScrollView>
				</View>
			</View>
		</View>
	);
};

export default FrontPage;

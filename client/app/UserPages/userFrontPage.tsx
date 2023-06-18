import { ScrollView, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import UserProfile from '../../components/UserProfile';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';
import { SelectList } from 'react-native-dropdown-select-list';
import { useEffect, useState } from 'react';
import { useFetchWeeks } from '../../hooks/UserPages/FrontPage/useFetchWeeks';
import DisplayTime from '../../components/UserPages/FrontPage/DisplayTime';
import DaySlotTableDisplay from '../../components/UserPages/FrontPage/DaySlotTableDisplay';
import { monthArrayNames } from '../../shared/monthArrayNames';
import { timeArrayNames } from '../../shared/timeArrayNames';
import LoadingDisplay from '../../components/LoadingDisplay';
import BookingDialogRequest from '../../components/UserPages/FrontPage/BookingDialogRequest';
import { useFetchId } from '../../hooks/UserPages/FrontPage/useFetchId';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessfulMessage from '../../components/SuccessfulMessage';

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

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);
	const [selectedBooking, setSelectedBooking] = useState<string>('');
	const [dateDialogDisplay, setDateDialogDisplay] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const yearArray = [
		new Date().getFullYear(),
		new Date().getFullYear() + 1,
		new Date().getFullYear() + 2,
	];

	const { userId } = useFetchId();

	// FUTURE UPDATE: make it so no week is selected but just display whole month
	// ALSO: must make it be an array for it to hold a value to compare with filter
	// FIX: do loading for the map part

	const SetWeekAmount = (weekArray: string[][]) => {
		const weekAmount: string[] = [];

		weekArray.map((value, index) => {
			let weekNumber: number = index + 1;
			weekAmount.push('Week ' + weekNumber);
		});

		setAmountOfWeeks(weekAmount);
		setCurrentWeekDays(weekArray[0]);
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
		const { weeksInMonth } = useFetchWeeks({
			month: month,
			monthArrayNames: monthArrayNames,
			year: year,
		});
		return weeksInMonth;
	};

	// Runs multiply times // it either runs unnecessary or just every time I refresh code
	useEffect(() => {
		console.log('run');

		const weeksFetched = handleFetch();

		setWeeks(weeksFetched);
		SetWeekAmount(weeksFetched);
	}, [month]);

	const SelectWeek = (value: string) => {
		let weekNumber: number = parseInt(value.split(' ')[1]);

		setCurrentWeekDays(weeks[weekNumber - 1]);
	};

	return (
		// Make relative and do absolute for booking dialog request
		<View className='h-full bg-white relative'>
			<Stack.Screen
				options={{
					headerTitle: 'Home',
					headerRight: () => <UserProfile />,
					headerTitleAlign: 'center',
					headerTitleStyle: { color: 'white' },
					headerStyle: { backgroundColor: '#0085FF' },
				}}
			/>

			{/* // TODO: will need a state to see when loading or processing */}
			{isLoading && <LoadingDisplay header='Processing...' />}
			{isError && (
				<View className='absolute items-center z-50 top-1/3 w-full'>
					<ErrorMessage
						message={errorMessage}
						isError={isError}
						activeStateChange={setIsError}
					/>
				</View>
			)}
			{/* // TODO: do state for success message MAYBE */}
			{isSuccess && (
				<SuccessfulMessage
					title='Booking Was Successful'
					isSuccess={isSuccess}
					setIsSuccess={setIsSuccess}
				/>
			)}
			{show && (
				<BookingDialogRequest
					selectedBooking={selectedBooking}
					dateDialogDisplay={dateDialogDisplay}
					userId={userId}
					setShow={setShow}
					setIsLoading={setIsLoading}
					setErrorMessage={setErrorMessage}
					setIsError={setIsError}
					setIsSuccess={setIsSuccess}
				/>
			)}

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

						{/* Will just putting warning for now on week select */}
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

				{/* TODO: make a drag up MAYBE */}
				{/* TODO: MAYBE add awaits for map process for loading */}
				<View className='h-[75%] w-full flex-row p-2'>
					<ScrollView
						contentContainerStyle={{
							paddingBottom: 20,
							flexDirection: 'row',
						}}
					>
						<View className='w-[80px] h-full'>
							<View className='bg-blue-400 w-full p-2 h-10 border-[1px] border-black border-t-0 border-l-0'></View>
							{timeArrayNames.map((value, index) => (
								<DisplayTime time={value} key={index} />
							))}
						</View>

						<View className='flex-row h-full'>
							<ScrollView
								horizontal={true}
								contentContainerStyle={{
									paddingRight: 100,
								}}
							>
								{currentWeekDays.map((day, index) => (
									<DaySlotTableDisplay
										key={index}
										year={year}
										month={month}
										day={day}
										times={timeArrayNames}
										setShow={setShow}
										setSelectedBooking={setSelectedBooking}
										setDateDialogDisplay={setDateDialogDisplay}
									/>
								))}
							</ScrollView>
						</View>
					</ScrollView>
				</View>
			</View>
		</View>
	);
};

export default FrontPage;

import { ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';
import UserProfile from '../../components/UserProfile';
import { useCallback, useEffect, useState } from 'react';
import { useFetchWeeks } from '../../hooks/UserPages/FrontPage/useFetchWeeks';
import DisplayTime from '../../components/UserPages/FrontPage/DisplayTime';
import DaySlotTableDisplay from '../../components/UserPages/FrontPage/DaySlotTableDisplay';
import { monthArrayNames } from '../../shared/monthArrayNames';
import { timeArrayNames } from '../../shared/timeArrayNames';
import LoadingDisplay from '../../components/LoadingDisplay';
import BookingDialogRequest from '../../components/UserPages/FrontPage/BookingDialogRequest';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessfulMessage from '../../components/SuccessfulMessage';
import fontPageStyles from '../../styles/User/FrontPage/styleSheet';
import DropDownSelect from '../../components/UserPages/FrontPage/DropDownSelect';
import { COLORS as colorSet } from '../../constants/theme';
import { useFetchCurrentYearMonths } from '../../hooks/UserPages/FrontPage/useFetchCurrentYearMonths';
import { useFetchBookedDates } from '../../hooks/UserPages/FrontPage/useFetchBookedDates';
import { yearArray } from '../../shared/yearArray';
import { usePressEvent } from '../../hooks/UserPages/FrontPage/usePressEvent';
import { socket } from '../index';
import { UserBookingResponseStatus } from '../../shared/types/userBookingResponseStatus.type';
import { useChangeBookingStatus } from '../../hooks/Socket.io/User/FrontPage/useChangeBookingStatus';

const FrontPage = () => {
	const [month, setMonth] = useState<string>(
		new Date().toLocaleString('en-us', { month: 'long' })
	);
	const [weeks, setWeeks] = useState<string[]>([]);
	const [year, setYear] = useState<string>(
		new Date().toLocaleString('en-us', { year: 'numeric' })
	);
	const [currentYearMonth, setCurrentYearMonth] = useState<string[]>([]);
	const [currentBookedDates, setCurrentBookedDates] = useState<string[]>([]);
	const [loadingHeader, setLoadingHeader] = useState<string>('Loading...');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);
	const [selectedBooking, setSelectedBooking] = useState<string>('');
	const [dateDialogDisplay, setDateDialogDisplay] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	socket.on(
		'user-frontPage-available-response',
		({ statusResponse, date }: UserBookingResponseStatus) => {
			useChangeBookingStatus({
				date: date,
				statusResponse: statusResponse,
				currentBookedDates: currentBookedDates,
				setCurrentBookedDates: setCurrentBookedDates,
			});
		}
	);

	// SLOW
	const OnPressClose = useCallback(() => {
		setShow(false);
	}, [setShow]);

	// SLOW
	const { PressEvent } = usePressEvent({
		setDateDialogDisplay: setDateDialogDisplay,
		setSelectedBooking: setSelectedBooking,
		setShow: setShow,
	});

	const SelectYear = (value: string) => {
		if (year !== value) {
			setYear(value);
		}
	};

	const SelectMonth = async (value: string) => {
		if (month !== value) {
			setIsLoading(true);

			setMonth(value);
		}
	};

	const handleFetch = () => {
		const { weeksInMonth } = useFetchWeeks({
			month: month,
			monthArrayNames: monthArrayNames,
			year: year,
		});
		return weeksInMonth;
	};

	useEffect(() => {
		const weeksFetched = handleFetch();

		useFetchCurrentYearMonths({ setCurrentYearMonths: setCurrentYearMonth });

		const fetchBookingDates = async () => {
			setLoadingHeader('Loading...');
			setIsLoading(true);
			await useFetchBookedDates({
				currentBookedDates: setCurrentBookedDates,
			});
			setIsLoading(false);
		};

		fetchBookingDates();

		setWeeks(weeksFetched);
	}, [month, year]);

	return (
		<View className='h-full bg-white relative'>
			<Stack.Screen
				options={{
					headerTitle: 'Home',
					headerRight: () => <UserProfile />,
					headerTitleAlign: 'center',
					headerTitleStyle: { color: colorSet.white },
					headerStyle: { backgroundColor: colorSet.primary },
				}}
			/>

			{isLoading && <LoadingDisplay header={loadingHeader} />}
			{isError && (
				<View className='absolute items-center z-50 top-1/3 w-full'>
					<ErrorMessage
						message={errorMessage}
						isError={isError}
						activeStateChange={setIsError}
					/>
				</View>
			)}

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
					currentBookedDates={currentBookedDates}
					setIsLoading={setIsLoading}
					setErrorMessage={setErrorMessage}
					setIsError={setIsError}
					setIsSuccess={setIsSuccess}
					setLoadingHeader={setLoadingHeader}
					setCurrentBookedDates={setCurrentBookedDates}
					OnPressClose={OnPressClose}
				/>
			)}

			<View className='h-full w-full flex-col items-center'>
				<View className='h-[25%] border-b border-black w-full px-2 pb-2 z-10'>
					<DropDownSelect
						title='Select Year:'
						setSelect={SelectYear}
						data={yearArray}
						placeholder={year}
						zIndex='z-50'
						dropdownStyle={{ backgroundColor: colorSet.white, zIndex: 100 }}
					/>
					<DropDownSelect
						title='Select Month:'
						setSelect={SelectMonth}
						data={
							parseInt(year) === new Date().getFullYear()
								? currentYearMonth
								: monthArrayNames
						}
						placeholder={month}
						zIndex='z-40'
						dropdownStyle={{
							backgroundColor: colorSet.white,
							position: 'relative',
							top: 0,
							zIndex: 90,
							maxHeight: 440,
						}}
					/>
				</View>

				{/* AMAZED: doing the loadingHeader not equal makes the process faster */}
				{!isLoading && loadingHeader !== 'Processing...' && (
					<View className='h-[75%] w-full flex-row px-2 py-1 z-0'>
						<ScrollView contentContainerStyle={fontPageStyles.scrollViewRow}>
							<View className='w-[80px] h-full'>
								<View className='bg-blue-400 w-full p-2 h-10 border-[1px] border-black border-t-0 border-l-0'></View>
								{timeArrayNames.map((value, index) => (
									<DisplayTime time={value} key={index} />
								))}
							</View>

							<View className='flex-row h-full'>
								<ScrollView
									horizontal={true}
									contentContainerStyle={fontPageStyles.scrollViewColumn}
								>
									{weeks.map((day, index) => (
										<DaySlotTableDisplay
											key={index}
											year={year}
											month={month}
											day={day}
											times={timeArrayNames}
											datesBooked={currentBookedDates}
											PressEvent={PressEvent}
										/>
									))}
								</ScrollView>
							</View>
						</ScrollView>
					</View>
				)}
			</View>
		</View>
	);
};

export default FrontPage;

import { monthArrayNames } from '../../../shared/monthArrayNames';

type useFetchCurrentYearMonthsProps = {
	setCurrentYearMonths: (action: string[]) => void;
};

export const useFetchCurrentYearMonths = ({
	setCurrentYearMonths,
}: useFetchCurrentYearMonthsProps) => {
	const currentMonth = new Date().getMonth();

	const filteredMonths = monthArrayNames.filter(
		(month, index) => index >= currentMonth
	);

	setCurrentYearMonths(filteredMonths);
};

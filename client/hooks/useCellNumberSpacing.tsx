type CellNumberSpacing = {
	number: string;
};

export const useCellNumberSpacing = ({ number }: CellNumberSpacing) => {
	const COUNT_EQUAL: number = 3;
	const SPACING_MAX_LESS: number = 2;

	let spacedNumber: string = '';
	let count: number = 0;
	let spacingMax: number = 0;

	for (let i = 0; i < number.length; i++) {
		spacedNumber += number[i];
		count++;

		if (count === COUNT_EQUAL && spacingMax < SPACING_MAX_LESS) {
			spacedNumber += ' ';
			count = 0;
			spacingMax++;
		}
	}

	return { spacedNumber };
};

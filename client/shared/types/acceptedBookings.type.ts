type UserAcceptedBookingsTypes = {
	age: number;
	cell_number: string;
	name: string;
	surname: string;
};

export type AcceptedBookingsTypes = {
	date: number;
	location_type: string;
	address: string;
	user: UserAcceptedBookingsTypes;
};

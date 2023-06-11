type User = {
	age: number;
	cell_number: string;
	name: string;
	surname: string;
};

export type Appointments = {
	appointment_id: number;
	date: number;
	location_type: string;
	address: string;
	user: User;
};

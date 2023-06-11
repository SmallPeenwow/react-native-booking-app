import { fetchPendingRequests } from '../../../services/FrontPage/fetchPendingRequests';
import { Appointments } from '../../../shared/types/appointments.type';

type ProcessFetchProps = {
	setState: (action: Appointments[]) => void;
};

export const ProcessFetch = async ({ setState }: ProcessFetchProps) => {
	await fetchPendingRequests().then((data) => {
		setState(data);
	});
};

import { fetchPendingRequests } from '../../../services/FrontPage/fetchPendingRequests';
import { Appointments } from '../../../shared/types/appointments.type';

type useProcessFetchProps = {
	setState: (action: Appointments[]) => void;
};

export const useProcessFetch = async ({ setState }: useProcessFetchProps) => {
	await fetchPendingRequests().then((data) => {
		setState(data);
	});
};

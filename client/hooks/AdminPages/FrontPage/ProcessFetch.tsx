import { fetchPendingRequests } from '../../../services/FrontPage/fetchPendingRequests';

type ProcessFetchProps = {
	setState: (action: any) => void;
};

export const ProcessFetch = async ({ setState }: ProcessFetchProps) => {
	await fetchPendingRequests().then((data) => {
		setState(data);
	});
};

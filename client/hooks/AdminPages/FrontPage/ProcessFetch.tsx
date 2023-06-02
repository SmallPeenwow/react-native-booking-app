import { useMemo } from 'react';
import { fetchPendingRequests } from '../../../services/FrontPage/fetchPendingRequests';

type ProcessFetchProps = {
	setState: (action: any) => void;
};

export const ProcessFetch = ({ setState }: ProcessFetchProps) => {
	useMemo(
		async () =>
			await fetchPendingRequests().then((data) => {
				setState(data);
			}),
		[]
	);
};

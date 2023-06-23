import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

type ConfirmAlertProps = {
	title: string;
	yes: string;
	no: string;
	message: string;
	onAccept: () => void;
};

// TODO: styling figure out since nothing work with tailwind
// https://www.npmjs.com/package/react-confirm-alert
export function ConfirmAlert({
	title,
	yes,
	no,
	message,

	onAccept,
}: ConfirmAlertProps) {
	return confirmAlert({
		closeOnEscape: true,
		closeOnClickOutside: true,
		customUI: ({ onClose }) => {
			return (
				<div className='absolute flex h-44 w-56'>
					<h1>{title}</h1>
					<p>{message}</p>
					<button onClick={onClose}>{no}</button>
					<button
						onClick={() => {
							onAccept(), onClose();
						}}
					>
						{yes}
					</button>
				</div>
			);
		},
	});
}

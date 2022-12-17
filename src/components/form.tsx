import React from 'react';

// eslint-disable-next-line unicorn/prevent-abbreviations
interface IFormProps {
	id?: string;
	children: React.ReactNode;
	CSS?: string;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ id, children, CSS, onSubmit }: IFormProps) {
	return (
		<form id={id} className={`w-full ${CSS}`} onSubmit={onSubmit}>
			{children}
		</form>
	);
}

import { faClose } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef } from 'react';

import Button from './button';

// eslint-disable-next-line unicorn/prevent-abbreviations
interface IInputProps {
	id?: string;
	value: string;
	placeholder?: string;
	CSS?: string;
	shouldClear: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onClear?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Input({
	id,
	value,
	placeholder,
	CSS,
	shouldClear,
	onChange,
	onClear
}: IInputProps) {
	const inputReference = useRef<HTMLInputElement>(null);

	useEffect(
		() => {
			inputReference.current?.focus();
		} /*, [] */
	);

	return (
		<div className='flex'>
			<input
				id={id}
				ref={inputReference}
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`w-full bg-transparent placeholder-color-secondary focus:border-none focus:outline-none ${CSS}`}
			/>
			{shouldClear ? (
				value.length > 2 ? (
					<Button
						type='icon'
						title='Clear input'
						icon={faClose}
						buttonCSS='ml-auto mr-4'
						iconCSS='text-color-primary hover:text-color-secondary'
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						onClick={onClear!}
					/>
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</div>
	);
}

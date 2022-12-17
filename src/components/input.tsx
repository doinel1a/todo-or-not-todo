import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';

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
					<button
						type='button'
						title='Clear input'
						className='ml-auto mr-4'
						onClick={onClear}
					>
						<FontAwesomeIcon
							icon={faClose}
							className='text-color-primary hover:text-color-secondary transition-colors'
						/>
					</button>
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</div>
	);
}

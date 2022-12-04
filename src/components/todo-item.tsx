import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface ITodoItem {
	task: string;
	isDone: boolean;
	onChecked: React.ChangeEventHandler<HTMLInputElement>;
	onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export default function TodoItem({
	task,
	isDone,
	onChecked,
	onDelete
}: ITodoItem) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<li
			className='flex p-4 border border-tertiary'
			onMouseEnter={() => setIsHovered((previousState) => !previousState)}
			onMouseLeave={() => setIsHovered((previousState) => !previousState)}
		>
			<input type='checkbox' checked={isDone} onChange={onChecked} />
			<p className={`ml-2 ${isDone ? 'line-through' : ''}`}>{task}</p>
			{isHovered ? (
				<button
					type='button'
					title='Delete task'
					className='ml-auto'
					onClick={onDelete}
				>
					<FontAwesomeIcon icon={faClose} className='text-red-400' />
				</button>
			) : (
				<></>
			)}
		</li>
	);
}

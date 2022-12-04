import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

import { ITodo } from '../types/todo';

interface ITodoItem {
	todo: ITodo;
	onChecked: (todoId: string) => void;
	onDelete: (todoId: string) => void;
	onUpdate: (todoId: string, updatedTask: string) => void;
}

export default function TodoItem({
	todo,
	onChecked,
	onDelete,
	onUpdate
}: ITodoItem) {
	const [isHovered, setIsHovered] = useState(false);
	const [isEditMode, setIsEditing] = useState(false);
	const [updatedTask, setUpdatedTask] = useState(todo.task);
	const inputReference = useRef<HTMLInputElement>(null);

	useEffect(
		() => {
			inputReference.current?.focus();
		} /*, [] */
	);

	useEffect(() => {
		if (isEditMode)
			document.body.addEventListener('click', handleOutsideClicks);
		else document.body.removeEventListener('click', handleOutsideClicks);

		() => document.body.removeEventListener('click', handleOutsideClicks);
	}, [isEditMode]);

	function handleOutsideClicks(event: MouseEvent) {
		if ((event.target as Element).id !== 'edit') setIsEditing(false);
	}

	const updateTask = (event: React.FormEvent) => {
		event.preventDefault();

		setIsEditing(false);

		if (todo.task !== updatedTask) onUpdate(todo.id, updatedTask);
	};

	return (
		<li
			className='flex p-4 border border-tertiary'
			onMouseEnter={() => setIsHovered((previousState) => !previousState)}
			onMouseLeave={() => setIsHovered((previousState) => !previousState)}
		>
			{isEditMode ? (
				<form
					className='w-full'
					onSubmit={(event) => updateTask(event)}
				>
					<input
						id='edit'
						ref={inputReference}
						type='text'
						value={updatedTask}
						className='w-full pl-5 bg-transparent focus:border-none focus:outline-none'
						onChange={(event) => setUpdatedTask(event.target.value)}
					/>
				</form>
			) : (
				<>
					<input
						type='checkbox'
						checked={todo.isDone}
						onChange={() => onChecked(todo.id)}
					/>
					<p
						className={`w-full ml-2 ${
							todo.isDone ? 'line-through' : ''
						}`}
						onDoubleClick={() => {
							setIsHovered((previousState) => !previousState);
							setIsEditing((previousState) => !previousState);
						}}
					>
						{todo.task}
					</p>
				</>
			)}

			{isHovered ? (
				<button
					type='button'
					title='Delete task'
					className='ml-auto'
					onClick={() => onDelete(todo.id)}
				>
					<FontAwesomeIcon icon={faClose} className='text-red-400' />
				</button>
			) : (
				<></>
			)}
		</li>
	);
}

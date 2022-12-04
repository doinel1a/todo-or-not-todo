import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import useTodos from '../hooks/use-todos';

export default function AddTodo() {
	const { todos, setTodos } = useTodos();
	const [task, setTask] = useState('');
	const inputReference = useRef<HTMLInputElement>(null);

	useEffect(
		() => {
			inputReference.current?.focus();
		} /*, [] */
	);

	const addTodo = (event: React.FormEvent) => {
		event.preventDefault();

		if (task !== '') {
			setTodos([
				...todos,
				{
					id: uuid(),
					task: task,
					isDone: false
				}
			]);
		}

		setTask('');
	};

	return (
		<form
			className='w-full border border-tertiary'
			onSubmit={(event) => addTodo(event)}
		>
			<div className='flex'>
				<input
					ref={inputReference}
					type='text'
					placeholder='What needs to be done?'
					value={task}
					onChange={(event) => setTask(event.target.value)}
					className='w-full p-4 bg-transparent focus:border-none focus:outline-none'
				/>
				{task.length > 2 ? (
					<button
						type='button'
						title='Clear input'
						className='ml-auto mr-4'
						onClick={() => setTask('')}
					>
						<FontAwesomeIcon
							icon={faClose}
							className='text-color'
						/>
					</button>
				) : (
					<></>
				)}
			</div>
		</form>
	);
}

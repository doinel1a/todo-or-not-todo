import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import useTodos from '../hooks/use-todos';
import Form from './form';
import Input from './input';

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
				{
					id: uuid(),
					task: task,
					createdAt: new Date().toLocaleString(),
					completedAt: '',
					isDone: false
				},
				...todos
			]);
		}

		setTask('');
	};

	return (
		<Form
			id='add'
			CSS={`border border-tertiary ${
				todos.length > 0 ? ' rounded-t-lg' : 'rounded-lg'
			}`}
			onSubmit={(event) => addTodo(event)}
		>
			<Input
				value={task}
				placeholder='What needs to be done?'
				CSS='p-4'
				shouldClear={true}
				onChange={(event) => setTask(event.target.value)}
				onClear={() => setTask('')}
			/>
		</Form>
	);
}

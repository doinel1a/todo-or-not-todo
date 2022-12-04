import React from 'react';

import useTodos from '../hooks/use-todos';
import { createDeepCopy } from '../utils/json';
import TodoItem from './todo-item';

export default function TodoList() {
	const { todos, setTodos } = useTodos();

	const tasksToComplete = todos.filter((todo) => !todo.isDone).length;

	const onChecked = (todoId: string) => {
		const temporaryTodos = createDeepCopy(todos);

		temporaryTodos.map((temporaryTodo) => {
			if (temporaryTodo.id === todoId)
				temporaryTodo.isDone = !temporaryTodo.isDone;
		});

		setTodos(temporaryTodos);
	};

	const onDelete = (todoId: string) => {
		const temporaryTodos = createDeepCopy(todos);

		setTodos(
			temporaryTodos.filter(
				(temporaryTodo) => temporaryTodo.id !== todoId
			)
		);
	};

	return (
		<>
			<ul className='w-full h-full overflow-y-auto'>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						task={todo.task}
						isDone={todo.isDone}
						onChecked={() => onChecked(todo.id)}
						onDelete={() => onDelete(todo.id)}
					/>
				))}
			</ul>
			{todos.length > 0 ? (
				<div className='w-full p-2'>
					<span>
						{tasksToComplete}
						{tasksToComplete > 1 || tasksToComplete == 0
							? ' tasks '
							: ' task '}
						to complete
					</span>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

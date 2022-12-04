import React, { useEffect, useState } from 'react';

import useTodos from '../hooks/use-todos';
import { createDeepCopy } from '../utils/json';
import ListFooter from './list-footer';
import TodoItem from './todo-item';

export default function TodoList() {
	const { todos, setTodos } = useTodos();

	const [activeFilter, setActiveFilter] = useState('All');
	const [filteredTodos, setFilteredTodos] = useState(createDeepCopy(todos));

	useEffect(() => {
		setActiveFilter('All');
		setFilteredTodos(createDeepCopy(todos));
	}, [todos]);

	const onChecked = (todoId: string) => {
		const temporaryTodos = createDeepCopy(todos);

		temporaryTodos.map((temporaryTodo) => {
			if (temporaryTodo.id === todoId)
				temporaryTodo.isDone = !temporaryTodo.isDone;
		});

		setTodos(temporaryTodos);
	};

	const onFilter = (filter: string) => {
		switch (filter) {
			case 'all': {
				setFilteredTodos(todos);

				break;
			}
			case 'active': {
				setFilteredTodos(todos.filter((todo) => !todo.isDone));

				break;
			}
			case 'completed': {
				setFilteredTodos(todos.filter((todo) => todo.isDone));

				break;
			}
		}
	};

	const onDelete = (todoId: string) => {
		const temporaryTodos = createDeepCopy(todos);

		setTodos(
			temporaryTodos.filter(
				(temporaryTodo) => temporaryTodo.id !== todoId
			)
		);
	};

	const onClearCompleted = () => {
		const temporaryTodos = createDeepCopy(todos);

		setTodos(
			temporaryTodos.filter((temporaryTodos) => !temporaryTodos.isDone)
		);
	};

	if (todos.length > 0) {
		return (
			<>
				<ul className='w-full h-full overflow-y-auto'>
					{filteredTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							task={todo.task}
							isDone={todo.isDone}
							onChecked={() => onChecked(todo.id)}
							onDelete={() => onDelete(todo.id)}
						/>
					))}
				</ul>
				<ListFooter
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					onFilter={onFilter}
					onClearCompleted={onClearCompleted}
				/>
			</>
		);
	}

	return <></>;
}

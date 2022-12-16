import React, { useEffect, useState } from 'react';

import useTodos from '../hooks/use-todos';
import useTodosCount from '../hooks/use-todos-count';
import { createDeepCopy } from '../utils/json';
import ListFooter from './list-footer';
import TodoItem from './todo-item';

const roundedLG = 'rounded-lg';
const roundedTopLG = 'rounded-t-lg';

export default function TodoList() {
	const { todos, setTodos } = useTodos();
	const { totalTodos, activeTodos, completedTodos } = useTodosCount();

	const [activeFilter, setActiveFilter] = useState('All');
	const [filteredTodos, setFilteredTodos] = useState(createDeepCopy(todos));

	useEffect(() => {
		setActiveFilter('All');
		setFilteredTodos(createDeepCopy(todos));
	}, [todos]);

	const onChecked = (todoId: string) => {
		const temporaryTodos = createDeepCopy(todos);

		temporaryTodos.map((temporaryTodo) => {
			if (temporaryTodo.id === todoId) {
				temporaryTodo.isDone = !temporaryTodo.isDone;
				temporaryTodo.completedAt = temporaryTodo.isDone
					? new Date().toLocaleString()
					: '';
			}
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

	const onUpdate = (todoId: string, updatedTask: string) => {
		const temporaryTodos = createDeepCopy(todos);

		temporaryTodos.map((temporaryTodo) => {
			if (temporaryTodo.id === todoId) temporaryTodo.task = updatedTask;
		});

		setTodos(temporaryTodos);
	};

	const onFilter = (filter: string) => {
		const addTodoForm = document.querySelector('#add');

		switch (filter) {
			case 'all': {
				if (totalTodos > 0) {
					addTodoForm?.classList.remove(roundedLG);
					addTodoForm?.classList.add(roundedTopLG);
				} else {
					addTodoForm?.classList.remove(roundedTopLG);
					addTodoForm?.classList.add(roundedLG);
				}

				setFilteredTodos(todos);

				break;
			}
			case 'active': {
				if (activeTodos === 0) {
					addTodoForm?.classList.remove(roundedTopLG);
					addTodoForm?.classList.add(roundedLG);
				} else {
					addTodoForm?.classList.remove(roundedLG);
					addTodoForm?.classList.add(roundedTopLG);
				}

				setFilteredTodos(todos.filter((todo) => !todo.isDone));

				break;
			}
			case 'completed': {
				if (completedTodos === 0) {
					addTodoForm?.classList.remove(roundedTopLG);
					addTodoForm?.classList.add(roundedLG);
				} else {
					addTodoForm?.classList.remove(roundedLG);
					addTodoForm?.classList.add(roundedTopLG);
				}

				setFilteredTodos(todos.filter((todo) => todo.isDone));

				break;
			}
		}
	};

	const onClearCompleted = () => {
		const temporaryTodos = createDeepCopy(todos);

		setTodos(
			temporaryTodos.filter((temporaryTodos) => !temporaryTodos.isDone)
		);
	};

	if (totalTodos > 0) {
		return (
			<>
				<ul className='w-full h-full overflow-y-auto overflow-x-hidden'>
					{filteredTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onChecked={onChecked}
							onDelete={onDelete}
							onUpdate={onUpdate}
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

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

import AddTask from '../components/tasks/add-task';
import TodoList from '../components/tasks/tasks-list';
import { IList } from '../types/list';

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ITodosProps {
	list: IList;
}

export default function TasksList({ list }: ITodosProps) {
	console.log(list);
	return (
		<>
			<nav className='w-full relative flex justify-start items-center mb-4 '>
				<Link to='/' title='Back' className='absolute'>
					<FontAwesomeIcon
						icon={faChevronLeft}
						className='text-lg text-color-primary transition-colors hover:text-color-secondary'
					/>
				</Link>
				<h2 className='w-full text-2xl font-bold text-center'>
					{list.name}
				</h2>
			</nav>

			<AddTask list={list} />
			<TodoList list={list} />
		</>
	);
}

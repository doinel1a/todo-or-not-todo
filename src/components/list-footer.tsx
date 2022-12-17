import React from 'react';

import useTodosCount from '../hooks/use-todos-count';
import Button from './button';

interface IListFooter {
	activeFilter: string;
	setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
	onFilter: (filter: string) => void;
	onClearCompleted: React.MouseEventHandler<HTMLButtonElement>;
}

const filters = [
	{
		type: 'All',
		title: 'Show all tasks'
	},
	{
		type: 'Active',
		title: 'Show active tasks'
	},
	{
		type: 'Completed',
		title: 'Show completed tasks'
	}
];

export default function ListFooter({
	activeFilter,
	setActiveFilter,
	onFilter,
	onClearCompleted
}: IListFooter) {
	const { totalTodos, activeTodos, completedTodos } = useTodosCount();

	if (totalTodos > 0) {
		return (
			<footer className='w-full relative flex justify-between items-center mt-4'>
				{activeFilter === 'Completed' ? (
					<span className='text-sm'>
						{completedTodos}
						{completedTodos > 1 || completedTodos == 0
							? ' tasks '
							: ' task '}
						completed
					</span>
				) : (
					<span className='text-sm'>
						{activeTodos}
						{activeTodos > 1 || activeTodos == 0
							? ' tasks '
							: ' task '}
						to complete
					</span>
				)}
				<div className='w-full absolute flex justify-center items-center gap-x-2'>
					{filters.map((filter, index) => (
						<Button
							key={`${index}-${filter}`}
							type='text'
							title={filter.title}
							text={filter.type}
							buttonCSS={`text-sm px-2 border border-transparent ${
								activeFilter === filter.type
									? 'border-accent-primary-state'
									: 'hover:border-accent-primary'
							}`}
							onClick={() => {
								if (filter.type !== activeFilter) {
									setActiveFilter(filter.type);
									onFilter(filter.type.toLowerCase());
								}
							}}
						/>
					))}
				</div>
				{completedTodos > 0 ? (
					<Button
						type='text'
						title='Delete completed tasks'
						text='Clear completed'
						buttonCSS='z-[1] text-sm hover:text-accent-primary transition-colors'
						onClick={onClearCompleted}
					/>
				) : (
					<></>
				)}
			</footer>
		);
	}

	return <></>;
}

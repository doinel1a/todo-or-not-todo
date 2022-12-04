import React from 'react';

import useTodos from '../hooks/use-todos';

interface IListFooter {
	activeFilter: string;
	setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
	onFilter: (filter: string) => void;
	onClearCompleted: React.MouseEventHandler<HTMLButtonElement>;
}

const filters = [
	{
		type: 'All'
	},
	{
		type: 'Active'
	},
	{
		type: 'Completed'
	}
];

export default function ListFooter({
	activeFilter,
	setActiveFilter,
	onFilter,
	onClearCompleted
}: IListFooter) {
	const { todos } = useTodos();

	const tasksCompleted = todos.filter((todo) => todo.isDone).length;
	const tasksToComplete = todos.filter((todo) => !todo.isDone).length;

	if (todos.length > 0) {
		return (
			<footer className='w-full relative flex justify-between items-center mt-4'>
				{activeFilter === 'Completed' ? (
					<span>
						{tasksCompleted}
						{tasksCompleted > 1 || tasksCompleted == 0
							? ' tasks '
							: ' task '}
						completed
					</span>
				) : (
					<span>
						{tasksToComplete}
						{tasksToComplete > 1 || tasksToComplete == 0
							? ' tasks '
							: ' task '}
						to complete
					</span>
				)}
				<div className='w-full absolute flex justify-center items-center gap-x-2'>
					{filters.map((filter, index) => (
						<button
							key={`${filter}-${index}`}
							type='button'
							className={`px-2 py-1 border border-transparent transition-colors ${
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
						>
							{filter.type}
						</button>
					))}
				</div>
				{tasksCompleted > 0 ? (
					<button
						type='button'
						title='Clear completed tasks'
						className='z-[1] hover:text-accent-primary transition-colors'
						onClick={onClearCompleted}
					>
						Clear completed
					</button>
				) : (
					<></>
				)}
			</footer>
		);
	}

	return <></>;
}

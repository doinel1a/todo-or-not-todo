import React from 'react';
import { ITask } from 'types/task';

import useTasksCount from '../../hooks/use-tasks-count';
import Button from '../button';

interface IListFooter {
	tasks: ITask[];
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
	tasks,
	activeFilter,
	setActiveFilter,
	onFilter,
	onClearCompleted
}: IListFooter) {
	const { totalTasks, activeTasks, completedTasks } = useTasksCount(tasks);

	if (totalTasks > 0) {
		return (
			<footer className='w-full relative flex justify-between items-center mt-4'>
				{activeFilter === 'Completed' ? (
					<span className='text-sm'>
						{completedTasks}
						{completedTasks > 1 || completedTasks == 0
							? ' tasks '
							: ' task '}
						completed
					</span>
				) : (
					<span className='text-sm'>
						{activeTasks}
						{activeTasks > 1 || activeTasks == 0
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
				{completedTasks > 0 && activeFilter !== 'Active' ? (
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

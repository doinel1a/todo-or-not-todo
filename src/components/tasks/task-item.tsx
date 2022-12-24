/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faClose, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import { ITask } from '../../types/task';
import Button from '../button';
import Form from '../form';
import Input from '../input';

interface ITaskItem {
	task: ITask;
	onChecked: (taskId: string) => void;
	onDelete: (taskId: string) => void;
	onUpdate: (taskId: string, updatedTask: string) => void;
}

export default function TaskItem({
	task,
	onChecked,
	onDelete,
	onUpdate
}: ITaskItem) {
	const [isHovered, setIsHovered] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [updatedTask, setUpdatedTask] = useState(task.task);

	useEffect(() => {
		if (isEditMode)
			document.body.addEventListener('click', handleOutsideClicks);
		else document.body.removeEventListener('click', handleOutsideClicks);

		() => document.body.removeEventListener('click', handleOutsideClicks);
	}, [isEditMode]);

	function handleOutsideClicks(event: MouseEvent) {
		if ((event.target as Element).id !== 'edit') setIsEditMode(false);
	}

	const updateTask = (event: React.FormEvent) => {
		event.preventDefault();

		setIsEditMode(false);

		if (task.task !== updatedTask) onUpdate(task.id, updatedTask);
	};

	return (
		<li
			className='w-full p-4 text-lg border-b last:border-b-0 border-tertiary'
			onMouseEnter={() => {
				if (!isEditMode) setIsHovered(true);
			}}
			onMouseLeave={() => {
				if (!isEditMode) setIsHovered(false);
			}}
		>
			{isEditMode ? (
				<div className='relative flex flex-col px-2'>
					<Form
						onSubmit={(event) => updateTask(event)}
						CSS='border border-transparent'
					>
						<Input
							id='edit'
							value={updatedTask}
							shouldClear={false}
							onChange={(event) =>
								setUpdatedTask(event.target.value)
							}
						/>
					</Form>
					<FontAwesomeIcon
						icon={faSquarePen}
						className='absolute right-2 text-color-secondary'
					/>
					<div className='w-full flex justify-between mt-2 text-xs text-color-secondary cursor-default'>
						<span>Created: {task.createdAt}</span>
						{task.completedAt !== '' ? (
							<span>Completed: {task.completedAt}</span>
						) : (
							<></>
						)}
					</div>
				</div>
			) : (
				<div className='relative flex flex-col px-2'>
					<div className='flex'>
						<input
							type='checkbox'
							checked={task.isDone}
							onChange={() => onChecked(task.id)}
						/>
						<p
							title={task.isDone ? '' : 'Click to update task'}
							className={`w-fit ml-1 px-2 ${
								task.isDone
									? 'cursor-default border border-transparent text-color-secondary line-through'
									: 'cursor-text border border-transparent rounded-lg hover:border-accent-primary'
							}`}
							onClick={(event) => {
								if (!task.isDone) {
									event.preventDefault();
									event.stopPropagation();

									setIsHovered(false);
									setIsEditMode(true);
								}
							}}
						>
							{task.task}
						</p>
					</div>
					<div className='w-full flex justify-between mt-2 text-xs text-color-secondary cursor-default'>
						<span>Created: {task.createdAt}</span>
						{task.completedAt !== '' ? (
							<span>Completed: {task.completedAt}</span>
						) : (
							<></>
						)}
					</div>
					{isHovered ? (
						<Button
							type='icon'
							title='Delete task'
							icon={faClose}
							buttonCSS='absolute right-2'
							iconCSS='text-red-400 hover:text-red-600'
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();

								onDelete(task.id);
							}}
						/>
					) : (
						<></>
					)}
				</div>
			)}
		</li>
	);
}

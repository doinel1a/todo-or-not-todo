/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faClose, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useUserAgent from '../../hooks/use-user-agent';
import { IList } from '../../types/list';
import Button from '../button';
import Form from '../form';
import Input from '../input';

// eslint-disable-next-line unicorn/prevent-abbreviations
interface IListItemProps {
	list: IList;
	onUpdate: (todoId: string, updatedTask: string) => void;
	onDelete: (todoId: string) => void;
}

export default function ListItem({ list, onUpdate, onDelete }: IListItemProps) {
	const { isMobile } = useUserAgent();
	const [isHovered, setIsHovered] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [updatedName, setUpdatedName] = useState(list.name);

	useEffect(() => {
		if (isEditMode)
			document.body.addEventListener('click', handleOutsideClicks);
		else document.body.removeEventListener('click', handleOutsideClicks);

		() => document.body.removeEventListener('click', handleOutsideClicks);
	}, [isEditMode]);

	function handleOutsideClicks(event: MouseEvent) {
		if ((event.target as Element).id !== 'edit') {
			setIsEditMode(false);
		}
	}

	const updateListName = (event: React.FormEvent) => {
		event.preventDefault();

		setIsEditMode(false);

		if (list.name !== updatedName) onUpdate(list.id, updatedName);
	};

	return (
		<li
			className='w-full p-2 md:p-4 text-lg border-b last:border-b-0 border-tertiary'
			onMouseEnter={() => {
				if (!isMobile && !isEditMode) setIsHovered(true);
			}}
			onMouseLeave={() => {
				if (!isMobile && !isEditMode) setIsHovered(false);
			}}
		>
			{isEditMode ? (
				<div className='relative flex flex-col px-2'>
					<Form
						onSubmit={(event) => updateListName(event)}
						CSS='border border-transparent'
					>
						<Input
							id='edit'
							value={updatedName}
							shouldAutofocus={true}
							shouldClear={false}
							onChange={(event) =>
								setUpdatedName(event.target.value)
							}
						/>
					</Form>
					<FontAwesomeIcon
						icon={faSquarePen}
						className='absolute right-2 text-color-secondary'
					/>
					<div className='w-full flex flex-col md:flex-row  justify-between mt-2 text-xs text-color-secondary'>
						<span>Created: {list.createdAt}</span>
						{list.updatedAt !== '' ? (
							<span>Updated: {list.updatedAt}</span>
						) : (
							<></>
						)}
					</div>
				</div>
			) : (
				<Link
					to={`/${list.name.replaceAll(' ', '')}`}
					title={`Go to '${list.name}' list`}
					className='relative flex flex-col'
				>
					<p
						title='Click to update list name'
						className='w-fit px-2 cursor-text border border-transparent rounded-lg hover:border-accent-primary'
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();

							setIsHovered(false);
							setIsEditMode(true);
						}}
					>
						{list.name}
					</p>
					<div className='w-full flex flex-col md:flex-row justify-between mt-2 px-2 text-xs text-color-secondary'>
						<span>Created: {list.createdAt}</span>
						{list.updatedAt !== '' ? (
							<span>Updated: {list.updatedAt}</span>
						) : (
							<></>
						)}
					</div>
					{isMobile ? (
						<Button
							type='icon'
							title='Delete list'
							icon={faClose}
							buttonCSS='absolute right-2'
							iconCSS='text-red-400 hover:text-red-600'
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();

								onDelete(list.id);
							}}
						/>
					) : isHovered ? (
						<Button
							type='icon'
							title='Delete list'
							icon={faClose}
							buttonCSS='absolute right-2'
							iconCSS='text-red-400 hover:text-red-600'
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();

								onDelete(list.id);
							}}
						/>
					) : (
						<></>
					)}
				</Link>
			)}
		</li>
	);
}

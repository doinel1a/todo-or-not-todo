import React from 'react';

import useLists from '../../hooks/use-lists';
import { createDeepCopy } from '../../utils/json';
import ListItem from './list-item';

export default function Lists() {
	const { lists, setLists } = useLists();

	const onUpdate = (listId: string, updatedName: string) => {
		const temporaryLists = createDeepCopy(lists);

		temporaryLists.map((temporaryList) => {
			if (temporaryList.id === listId) temporaryList.name = updatedName;
		});

		setLists(temporaryLists);
	};

	const onDelete = (listId: string) => {
		const temporaryLists = createDeepCopy(lists);

		setLists(
			temporaryLists.filter(
				(temporaryList) => temporaryList.id !== listId
			)
		);
	};

	return (
		<ul
			className={`w-full h-full overflow-y-auto overflow-x-hidden rounded-b-lg ${
				lists.length > 0 ? 'border border-tertiary' : ''
			}`}
		>
			{lists.map((list) => (
				<ListItem
					key={list.id}
					list={list}
					onUpdate={onUpdate}
					onDelete={onDelete}
				/>
			))}
		</ul>
	);
}

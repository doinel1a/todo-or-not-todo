import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import useLists from '../../hooks/use-lists';
import Form from '../form';
import Input from '../input';

export default function AddList() {
	const { lists, setLists } = useLists();
	const [listName, setListName] = useState('');

	const addList = (event: React.FormEvent) => {
		event.preventDefault();

		if (listName.trim() !== '') {
			setLists([
				{
					id: uuid(),
					name: listName,
					tasks: [],
					createdAt: new Date().toLocaleString(),
					updatedAt: ''
				},
				...lists
			]);
		}

		setListName('');
	};

	return (
		<Form
			CSS={`border border-tertiary ${
				lists.length > 0 ? ' rounded-t-lg' : 'rounded-lg'
			}`}
			onSubmit={(event) => addList(event)}
		>
			<Input
				value={listName}
				placeholder='What needs to be handled?'
				CSS='p-4'
				shouldClear={true}
				onChange={(event) => setListName(event.target.value)}
				onClear={() => setListName('')}
			/>
		</Form>
	);
}

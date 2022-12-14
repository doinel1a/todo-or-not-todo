import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

// eslint-disable-next-line unicorn/prevent-abbreviations
interface IButtonProps {
	type: 'text' | 'icon';
	title: string;
	text?: string;
	icon?: IconProp;
	buttonCSS: string;
	iconCSS?: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
	type,
	title,
	text,
	icon,
	buttonCSS,
	iconCSS,
	onClick
}: IButtonProps) {
	switch (type) {
		case 'text': {
			return (
				<button
					type='button'
					title={title}
					className={`rounded-lg transition-colors ${buttonCSS}`}
					onClick={onClick}
				>
					{text}
				</button>
			);
		}
		case 'icon': {
			return (
				<button
					type='button'
					title={title}
					className={`transition-colors ${buttonCSS}`}
					onClick={onClick}
				>
					{icon ? (
						<FontAwesomeIcon
							icon={icon}
							className={`transition-colors ${iconCSS}`}
						/>
					) : (
						<></>
					)}
				</button>
			);
		}
	}
}

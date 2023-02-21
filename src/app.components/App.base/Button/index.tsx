import React from 'react';
import { BgColor, BorderColor, TextColor } from '../types';

export interface Props {
	variant: 'text' | 'solid' | 'outline';
	size: 'lg' | 'base' | 'sm' | 'xs';
	bgColor?: BgColor | null;
	textColor?: TextColor;
	borderColor?: BorderColor | null;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	isLoading?: boolean;
	children?: React.ReactNode;
	type?: 'button' | 'submit';
	name?: string;
	value?: string;
	className?: string;
	ariaPressed?: boolean;
}
export default function Button({
	variant,
	size,
	onClick,
	bgColor,
	borderColor,
	textColor,
	disabled,
	value,
	isLoading,
	children,
	type = 'button',
	name,
	className,
	ariaPressed,
}: Props) {
	const getHeight = () => {
		if (size === 'lg') {
			return 'min-h-[4.6rem] h-[4.6rem] pc:h-[7rem] pc:min-h-[7rem]';
		}
		if (size === 'base') {
			return 'min-h-[6rem] h-[6rem]';
		}
		if (size === 'sm') {
			return 'min-h-[3.4rem] h-[3.4rem] pc:h-[5.1rem] pc:min-h-[5.1rem]';
		}

		return 'h-[2rem] min-h-[2rem] pc:h-[3.4rem] pc:min-h-[3.4rem] ';
	};

	const getBorderStyle = () => {
		if (!borderColor) return '';
		return `${borderColor} border-[0.1rem]`;
	};

	if (isLoading) {
		return (
			<div className="flex justify-center text text py-[20px] pc:py-[24px]">
				<span>로딩중</span>
			</div>
		);
	}

	return (
		<button
			type={type}
			name={name}
			value={value}
			disabled={disabled}
			onClick={onClick}
			aria-pressed={ariaPressed}
			className={`${variant === 'outline' ? getBorderStyle() : ''} ${bgColor ?? ''} ${getHeight()} ${
				textColor ?? ''
			}    text-body4-mo pc:text-body4-pc text-center   w-full rounded-[0.8rem] ${className} `}
		>
			{children}
		</button>
	);
}

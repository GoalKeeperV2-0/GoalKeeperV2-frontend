import React from 'react';

type BgColor =
	| 'bg-primaryOrange-200'
	| 'bg-primaryOrange-100'
	| 'bg-primaryBlack-500'
	| 'bg-primaryBlack-100'
	| 'bg-white'
	| 'bg-buttonGray-100'
	| 'bg-buttonGray-200'
	| 'bg-buttonGray-300'
	| 'bg-buttonGray-400'
	| 'bg-buttonRed-200'
	| 'bg-buttonRed-100'
	| 'bg-primaryBlack-500';
type TextColor =
	| 'text-primaryOrange-200'
	| 'text-primaryOrange-100'
	| 'text-primaryBlack-500'
	| 'text-primaryBlack-100'
	| 'text-white'
	| 'text-buttonGray-100'
	| 'text-buttonGray-200'
	| 'text-buttonGray-300'
	| 'text-buttonGray-400'
	| 'text-buttonRed-200'
	| 'text-buttonRed-100';
type BorderColor =
	| 'border-primaryOrange-200'
	| 'border-primaryOrange-100'
	| 'border-primaryBlack-500'
	| 'border-primaryBlack-100'
	| 'border-white'
	| 'border-buttonGray-100'
	| 'border-buttonGray-200'
	| 'border-buttonGray-300'
	| 'border-buttonGray-400'
	| 'border-buttonRed-200'
	| 'border-buttonRed-100';
export interface Props {
	variant: 'text' | 'solid' | 'outline';
	size: 'lg' | 'base' | 'sm' | 'xs';
	bgColor: BgColor;
	textColor?: TextColor;
	borderColor?: BorderColor;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	isLoading?: boolean;
	children?: React.ReactNode;
	type?: 'button' | 'submit';
}
export default function SubmitButton({
	variant,
	size,
	onClick,
	bgColor,
	borderColor,
	textColor,
	disabled,
	isLoading,
	children,
	type = 'button',
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

		return 'h-[2.6rem] min-h-[2.6rem] pc:h-[3.5rem] pc:min-h-[3.5rem]';
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
			disabled={disabled}
			onClick={onClick}
			className={`${variant === 'outline' ? getBorderStyle() : ''} ${bgColor ?? ''} ${getHeight()} ${
				textColor ?? ''
			}    text-body4-mo pc:text-body4-pc text-center  leading-[100%] w-full rounded-[0.8rem]  `}
		>
			{children}
		</button>
	);
}

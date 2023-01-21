import React from 'react';

type Color =
	| 'primaryOrange-200'
	| 'primaryOrange-100'
	| 'primaryBlack-500'
	| 'primaryBlack-100'
	| 'primaryWhite'
	| 'buttonGray-100'
	| 'buttonGray-200'
	| 'buttonGray-300'
	| 'buttonGray-400'
	| 'buttonRed-200'
	| 'buttonRed-100';
export interface Props {
	variant: 'text' | 'solid' | 'outline';
	size: 'lg' | 'base' | 'sm' | 'xs';
	bgColor: Color;
	textColor?: Color;
	borderColor?: Color;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	isLoading?: boolean;
	children?: React.ReactNode;
}
function SubmitButton({
	variant,
	size,
	onClick,
	bgColor,
	borderColor,
	textColor,
	disabled,
	isLoading,
	children,
}: Props) {
	const getHeight = () => {
		if (size === 'lg') {
			return 'h-[4.6rem] pc:h-[7rem]';
		}
		if (size === 'base') {
			return 'h-[6rem]';
		}
		if (size === 'sm') {
			return 'h-[3.4rem] pc:h-[5.1rem]';
		}

		return 'h-[2.6rem] pc:h-[3.5rem]';
	};
	const getBgColor = () => {
		return `bg-${bgColor}`;
	};
	const getBorderStyle = () => {
		if (!borderColor) return '';
		return `border-${borderColor} border-[0.1rem]`;
	};
	const getTextColor = () => {
		if (!textColor) return '';
		return `text-${textColor} disabled:text-${'red-500'} `;
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
			type="submit"
			disabled={disabled}
			onClick={onClick}
			className={`${
				variant === 'outline' ? getBorderStyle() : ''
			} ${getBgColor()} ${getHeight()} ${getTextColor()}   text-body4-mo pc:text-body4-pc text-center  leading-[100%] w-full rounded-[0.8rem]  `}
		>
			{children}
		</button>
	);
}

export default React.memo(SubmitButton);
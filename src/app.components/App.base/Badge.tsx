import React from 'react';
import { BgColor, BorderColor, TextColor } from './types';
export interface Props {
	bgColor?: BgColor | null;
	textColor?: TextColor;
	borderColor?: BorderColor | null;
	children?: React.ReactNode;
	className?: string;
}
function Badge({ bgColor, textColor, borderColor, className, children }: Props) {
	const getBorderStyle = () => {
		if (!borderColor) return '';
		return `${borderColor} border-[0.1rem]`;
	};
	return (
		<div
			className={` ${bgColor ?? ''}  ${
				textColor ?? ''
			}    text-body4-mo pc:text-body4-pc text-center   w-fit rounded-[0.8rem] p-[0.8rem]  ${getBorderStyle()}  ${
				className ?? ''
			} `}
		>
			{children}
		</div>
	);
}

export default Badge;

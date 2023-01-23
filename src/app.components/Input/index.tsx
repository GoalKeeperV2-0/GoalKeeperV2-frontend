import React from 'react';

// TODO: 상태별로 색 mapping 시키기
type FocusColor = 'primaryOrange-200' | 'primaryRed-300';

interface Props {
	type: 'text' | 'email' | 'password';
	onChange: () => void;
	value: string;
	placeholder: string;
	isSubmitted?: boolean;
	isValid?: boolean;
	disabled?: boolean;
	color: FocusColor;
}
function TextInput({ type, color, onChange, value, isValid, isSubmitted, placeholder, disabled }: Props) {
	const getFocusColor = () => {
		if (color.includes('primaryOrange-200')) {
			return 'focus:border-primaryOrange-200';
		}
		return 'focus:border-primaryRed-300';
	};
	const getTextColor = () => {
		if (isSubmitted) {
			if (isValid) return 'text-primaryOrange-200';
			return 'text-primaryRed-300';
		}
		return '';
	};

	return (
		<input
			type={type}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			className={`${getFocusColor()} ${getTextColor()} w-full px-[1.6rem] min-h-[4.6rem] h-[4.6rem] pc:px-[2.4rem] pc:min-h-[7rem] pc:h-[7rem]  pc:border-[2px] border-[0.1rem] rounded-[0.8rem] focus:outline-none `}
		/>
	);
}

export default TextInput;

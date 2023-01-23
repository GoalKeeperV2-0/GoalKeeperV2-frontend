import React from 'react';

// TODO: 상태별로 색 mapping 시키기
type FocusColor = 'primaryOrange-200' | 'primaryRed-300';

interface Props {
	type: 'text' | 'email' | 'password';
	onChange: () => void;
	value: string;
	defaultValue?: string;
	placeholder: string;
	disabled?: boolean;
	focusColor: FocusColor;
}
function TextInput({ type, focusColor, onChange, value, defaultValue, placeholder, disabled }: Props) {
	const getFocusColor = () => {
		if (focusColor.includes('primaryOrange-200')) {
			return 'focus:border-primaryOrange-200';
		}
		return 'focus:border-buttonRed-200';
	};
	return (
		<input
			type={type}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			className={`${getFocusColor()} w-full min-h-[4.6rem] h-[4.6rem] pc:min-h-[7rem] pc:h-[7rem]  pc:border-[2px] border-[0.1rem] rounded-[0.8rem] focus:outline-none `}
		/>
	);
}

export default TextInput;

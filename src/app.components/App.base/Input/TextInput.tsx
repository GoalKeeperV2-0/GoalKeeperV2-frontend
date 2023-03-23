import React from 'react';

// TODO: 상태별로 색 mapping 시키기
type FocusColor = 'primaryOrange-200' | 'primaryRed-300';

interface Props {
	type: 'text' | 'email' | 'password';
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	placeholder: string;
	id: string;
	focusColor?: FocusColor | null;
	textColor?: FocusColor;
	disabled?: boolean;
	required?: boolean;
	minLength?: number;
	className?: string;
	name?: string;
	maxLength?: number;
}
function TextInput({
	type,
	id,
	onChange,
	value,
	focusColor, // TODO: Button이랑 통일성 갖추기
	textColor,
	placeholder,
	disabled,
	required,
	minLength,
	className,
	name,
	maxLength,
}: Props) {
	const getFocusColor = () => {
		if (focusColor?.includes('primaryOrange-200')) {
			return 'focus:border-primaryOrange-200';
		}
		return 'focus:border-primaryRed-300';
	};
	const getTextColor = () => {
		if (textColor !== undefined) {
			return `text-${textColor}`;
		}
		return '';
	};

	return (
		<input
			id={id}
			type={type}
			onChange={onChange}
			value={value}
			name={name}
			placeholder={placeholder}
			disabled={disabled}
			required={required}
			minLength={minLength}
			maxLength={maxLength}
			className={`${getFocusColor()} ${getTextColor()} w-full px-[1.6rem] min-h-[4.6rem] h-[4.6rem] pc:px-[2.4rem] pc:min-h-[7rem] pc:h-[7rem]  pc:border-[0.2rem] border-[0.1rem] rounded-[0.8rem] focus:outline-none ${className}`}
		/>
	);
}

export default TextInput;

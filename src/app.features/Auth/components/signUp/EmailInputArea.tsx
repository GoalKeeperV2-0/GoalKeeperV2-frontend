import ErrorMessage from 'app.components/App.base/Input/ErrorMessage';
import Label from 'app.components/App.base/Input/Label';
import TextInput from 'app.components/App.base/Input/TextInput';
import React from 'react';
import { INVALID_COLOR, VALID_COLOR } from '../../constants';
import { getFocusColor } from '../../utils/getFocusColor';

interface Props {
	onChange: () => void;
	value: string;
	isValid: boolean | null;
	errorContent?: string;
}
function EmailInputArea({ onChange, value, isValid, errorContent }: Props) {
	const getButtonColor = (): string => {
		if (isValid === null) {
			return 'text-[#351A1A] bg-[#F7F7F7]';
		}
		if (isValid) return `text-${VALID_COLOR} bg-${VALID_COLOR}`;
		return `text-${INVALID_COLOR} bg-${INVALID_COLOR}`;
	};
	// input 타입에 따라 다른 메세지를 반환
	const renderGuideMessage = () => {
		if (false) return '';
		if (true) {
			if (true) return '사용 가능한 이메일입니다.';
			return '잘못된 형식의 이메일입니다.';
		}

		return '';
	};

	return (
		<div className="space-y-[0.8rem] relative w-full">
			<Label required htmlFor="email" content="이메일" />
			<div className="relative">
				<TextInput
					id="email"
					type="email"
					onChange={onChange}
					value={value}
					placeholder="이메일"
					focusColor={getFocusColor(isValid)}
					required
				/>
				<button
					type="button"
					className={`absolute pc:min-w-[7.2rem] pc:min-h-[3.5rem] pc:w-[7.2rem] pc:h-[3.5rem] w-[5.8rem] h-[3rem] min-h-[3rem] min-w-[5.8rem] pc:text-[1.6rem] text-[1.2rem]  rounded-[0.8rem] text-center leading-[100%] right-[1.2rem] top-1/2 -translate-y-1/2 ${getButtonColor()}`}
				>
					중복확인
				</button>
			</div>
			{true && <ErrorMessage color={getFocusColor(isValid)} content={errorContent ?? ' '} />}
		</div>
	);
}

export default EmailInputArea;

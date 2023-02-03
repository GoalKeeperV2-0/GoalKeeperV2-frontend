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
function NicknameInputArea({ onChange, value, isValid, errorContent }: Props) {
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
		<div className="space-y-[0.8rem] w-full">
			<Label required htmlFor="nickname" content="닉네임" />
			<TextInput
				id="nickname"
				type="text"
				onChange={onChange}
				value={value}
				placeholder="닉네임을 작성해주세요"
				focusColor={getFocusColor(isValid)}
				required
			/>
			{true && <ErrorMessage color={getFocusColor(isValid)} content={errorContent ?? ' '} />}
		</div>
	);
}

export default NicknameInputArea;

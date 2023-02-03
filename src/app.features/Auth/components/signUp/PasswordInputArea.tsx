import ErrorMessage from 'app.components/App.base/Input/ErrorMessage';
import Label from 'app.components/App.base/Input/Label';
import TextInput from 'app.components/App.base/Input/TextInput';
import React from 'react';
import { getFocusColor } from '../../utils/getFocusColor';
interface Props {
	onChange: () => void;
	value: string;
	isValid: boolean | null;
	errorContent?: string;
}
function PasswordInputArea({ onChange, value, isValid, errorContent }: Props) {
	return (
		<div className="space-y-[0.8rem] w-full">
			<Label required htmlFor="password" content="비밀번호" />
			<TextInput
				id="password"
				type="password"
				onChange={onChange}
				value={value}
				placeholder="비밀번호 (8자리 이상)"
				focusColor={getFocusColor(isValid)}
				required
				minLength={8}
			/>
			<TextInput
				id="password-check"
				type="password"
				onChange={onChange}
				value={value}
				placeholder="비밀번호 확인"
				focusColor={getFocusColor(isValid)}
				required
				minLength={8}
			/>

			{true && <ErrorMessage color={getFocusColor(isValid)} content={errorContent ?? ' '} />}
		</div>
	);
}

export default PasswordInputArea;

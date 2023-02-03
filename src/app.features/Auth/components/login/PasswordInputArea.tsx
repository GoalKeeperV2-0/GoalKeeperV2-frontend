import Label from 'app.components/App.base/Input/Label';
import TextInput from 'app.components/App.base/Input/TextInput';
import React from 'react';
interface Props {
	onChange: () => void;
	value: string;
}
function PasswordInputArea({ onChange, value }: Props) {
	return (
		<div className="space-y-[0.8rem] w-full">
			<Label htmlFor="password-login" content="비밀번호" />
			<TextInput
				id="password-login"
				type="password"
				onChange={onChange}
				value={value}
				placeholder="비밀번호 (8자리 이상)"
				focusColor="primaryOrange-200"
				required
				minLength={8}
			/>
		</div>
	);
}

export default PasswordInputArea;

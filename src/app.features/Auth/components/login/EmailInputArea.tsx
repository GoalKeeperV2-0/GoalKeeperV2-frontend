import Label from 'app.components/App.base/Input/Label';
import TextInput from 'app.components/App.base/Input/TextInput';
import React from 'react';

interface Props {
	onChange: () => void;
	value: string;
}
function EmailInputArea({ onChange, value }: Props) {
	return (
		<div className="space-y-[0.8rem] relative w-full">
			<Label required={false} htmlFor="email-login" content="이메일" />
			<TextInput
				id="email-login"
				type="email"
				onChange={onChange}
				value={value}
				placeholder="이메일"
				focusColor="primaryOrange-200"
				required
			/>
		</div>
	);
}

export default EmailInputArea;

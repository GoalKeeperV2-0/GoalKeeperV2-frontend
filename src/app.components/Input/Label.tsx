import React from 'react';

interface Props {
	required: boolean;
	htmlFor: string;
	content: string;
}
function Label({ required, htmlFor, content }: Props) {
	// eslint-disable-next-line jsx-a11y/label-has-associated-control
	return (
		<label htmlFor={htmlFor} className="text-body5-mo pc:text-body5-pc">
			{content} {required && <span className="font-semibold text-primaryOrange-200 ">*</span>}
		</label>
	);
}

export default Label;

import Label from 'app.components/Input/Label';
import React from 'react';

function OptionalInputArea() {
	return (
		<div className="space-y-[0.8rem]">
			<Label htmlFor="options" content="선택사항" />
			<div className="flex justify-between items-center">
				<div />
				<div />
			</div>
		</div>
	);
}

export default OptionalInputArea;

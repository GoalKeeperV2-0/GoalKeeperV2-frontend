import Label from 'app.components/Input/Label';
import Select from 'app.components/Select';
import React from 'react';

function OptionalInputArea() {
	return (
		<div className="space-y-[0.8rem] w-full">
			<Label htmlFor="options" content="선택사항" />
			<div className="flex justify-between items-center space-x-[0.8rem] pc:space-x-[2.1rem]">
				<Select options={['감자', '고구마', '바나나']} value={null} onChange={() => null} placeholder="성별" />
				<Select options={['감자', '고구마', '바나나']} value={null} onChange={() => null} placeholder="나이" />
			</div>
		</div>
	);
}

export default OptionalInputArea;

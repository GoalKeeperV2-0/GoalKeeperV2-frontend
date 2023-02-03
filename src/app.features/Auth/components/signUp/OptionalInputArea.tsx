import Label from 'app.components/App.base/Input/Label';
import Select from 'app.components/Select';
import React from 'react';

export type SexType = 'MAN' | 'WAMAN' | null;
export type AgeType = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | null;

interface Props {
	sex: SexType;
	age: AgeType; // TODO: 배열로 정의할 순 없을까?
	onSelect: (e: React.BaseSyntheticEvent) => void;
}

function OptionalInputArea({ sex, age, onSelect }: Props) {
	const SEX_MAP = new Map<string, string>([
		['MAN', '남자'],
		['WAMAN', '여자'],
	]);
	const AGE_MAP = new Map<string, string>([
		['10', '10대'],
		['20', '20대'],
		['30', '30대'],
		['40', '40대'],
		['50', '50대'],
		['60', '60대'],
		['70', '70대'],
		['80', '80대'],
	]);

	return (
		<div className="space-y-[0.8rem] w-full">
			<Label htmlFor="options" content="선택사항" />
			<div className="flex justify-between items-center space-x-[0.8rem] pc:space-x-[2.1rem]">
				<Select options={SEX_MAP} name="sex" value={sex} onSelect={onSelect} placeholder="성별" />
				<Select options={AGE_MAP} name="age" value={age} onSelect={onSelect} placeholder="나이" />
			</div>
		</div>
	);
}

export default OptionalInputArea;

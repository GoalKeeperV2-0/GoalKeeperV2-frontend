import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import { CategoryType } from 'app.modules/api/goal';
import React from 'react';

type MappedCategory = { [K in CategoryType]: string };
interface Props {
	value: CategoryType | null;
	onChange: (e: React.BaseSyntheticEvent) => void;
}
function SelectCategoryArea({ value, onChange }: Props) {
	const category: MappedCategory = {
		EXERCISE: '운동',
		STUDY: '공부',
		HOBBY: '취미',
		HABIT: '습관',
		ETC: '기타',
	};
	return (
		<div className="space-y-[2.4rem]  w-full">
			<Label required htmlFor="select-goal-category" content="카테고리 선택" />
			<ul className="flex flex-wrap space-x-[1.6rem]">
				{Object.entries(category).map(([item, content]) => (
					<li key={item}>
						<Button
							size="sm"
							onClick={onChange}
							name="categoryType"
							ariaPressed={value === item}
							value={item}
							bgColor={value === item ? 'bg-primaryOrange-200' : null}
							textColor={value === item ? 'text-white' : 'text-primaryOrange-200'}
							borderColor={value === item ? null : 'border-primaryOrange-200'}
							variant={value === item ? 'solid' : 'outline'}
							className="w-[8rem] text-white"
						>
							{content}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SelectCategoryArea;

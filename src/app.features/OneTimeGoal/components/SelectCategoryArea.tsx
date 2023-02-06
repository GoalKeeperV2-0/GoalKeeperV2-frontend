import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import React from 'react';
interface Props {
	value: string;
}

function SelectCategoryArea({ value }: Props) {
	return (
		<div className="space-y-[2.4rem]  w-full">
			<Label required htmlFor="select-goal-category" content="카테고리 선택" />
			<ul className="flex flex-wrap space-x-[1.6rem]">
				{['운동', '공부', '습관', '취미', '기타'].map((category) => (
					<li key={category}>
						<Button
							size="sm"
							name="selectGoalCategory"
							ariaPressed={value === category}
							value={value}
							variant="outline"
							bgColor="bg-primaryOrange-200"
							className="w-[8rem] text-white"
						>
							{category}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SelectCategoryArea;

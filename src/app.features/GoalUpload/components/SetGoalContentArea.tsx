import Label from 'app.components/App.base/Input/Label';
import TextInput from 'app.components/App.base/Input/TextInput';
import React from 'react';
import { useRecoilState } from 'recoil';
import { goalFormState } from '../store';
import CountTextLength from './CountTextLength';
interface Props {
	onChange: (e: React.BaseSyntheticEvent) => void;
}
function SetGoalContentArea({ onChange }: Props) {
	const [goalForm, setGoalForm] = useRecoilState(goalFormState);
	return (
		<div className="space-y-[2.4rem]  w-full ">
			<Label required htmlFor="goal-title" content="일반목표 제목" />
			<div className="flex flex-col items-end space-y-[0.8rem]">
				<TextInput
					id="goal-title"
					value={goalForm.title}
					type="text"
					placeholder="제목을 작성해주세요."
					focusColor="primaryOrange-200"
					required
					name="title"
					onChange={(e) => {
						if (e.currentTarget.value.length > 20) return;
						onChange(e);
					}}
					maxLength={20}
				/>
				<CountTextLength maxLength={20} textLength={goalForm.title.length} />
			</div>
			<div className="flex flex-col items-end space-y-[0.8rem]">
				<textarea
					id="goal-content"
					value={goalForm.content}
					placeholder="목표 달성 게시글에 올릴 상세 내용을 작성하세요."
					required
					name="content"
					onChange={(e) => {
						if (e.currentTarget.value.length > 72) return;
						onChange(e);
					}}
					maxLength={72}
					className="resize-none scrollbar w-full h-[9.4rem] outline-none focus:border-primaryOrange-200 pc:border-[0.2rem] border-[0.1rem] rounded-[0.8rem] p-[2.4rem]"
				/>
				<CountTextLength maxLength={72} textLength={goalForm.content.length} />
			</div>
		</div>
	);
}

export default SetGoalContentArea;

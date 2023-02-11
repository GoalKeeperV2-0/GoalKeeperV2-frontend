import SubmitButton from 'app.components/SubmitButton';
import React, { useEffect, useReducer, useState } from 'react';
import SelectCategoryArea, { CategoryType } from '../components/SelectCategoryArea';
import SelectGoalTypeArea, { GoalType } from '../components/SelectGoalTypeArea';
import SelectReturnTypeArea from '../components/SelectReturnTypeArea';
import SetBallArea from '../components/SetBallArea';
import SetGoalContentArea from '../components/SetGoalContentArea';
import SetTermArea from '../components/SetTermArea';
// TODO: 리코일 방식이 나을듯-> 리코일 방식으로 바꾸자
type UploadGoalFormType = {
	goalType: GoalType;
	// 오늘 날짜가 '4일'인 경우 4일 disable 최소 내일부터 시작하게 D-1
	endDate: string; // '2023-02-13'
	title: string;
	categoryType: CategoryType;
	content: string;
	point: string;
	reward: 'HIGH_RETURN' | 'LOW_RETURN';
};
type FormAction = {
	type: keyof UploadGoalFormType | 'init';
	payload?: unknown;
};
const initialFormState: UploadGoalFormType = {
	goalType: 'onetime',
	endDate: '', // '2023-02-13'
	title: '',
	categoryType: 'EXERCISE',
	content: '',
	point: '',
	reward: 'HIGH_RETURN',
};
function formReducer(state: UploadGoalFormType, action: FormAction) {
	if (action.type === 'init') {
		return initialFormState;
	}
	return { ...state, [action.type]: action.payload };
}

function UploadGoal() {
	console.log('upload-one-time-goal');

	const [formState, formDispatch] = useReducer(formReducer, initialFormState);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('submit', formState);
	};

	const valueHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		formDispatch({
			type: name,
			payload: value,
		});
	};
	const pointHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(Number(value))) return;
		formDispatch({
			type: 'point',
			payload: +value > 100 ? '100' : value,
		});
	};
	const onetimeGoalTermHandler = (date: string) => {
		formDispatch({
			type: 'endDate',
			payload: date,
		});
	};
	useEffect(() => {
		const { content, point, title, endDate } = formState;
		if (!content.trim() || !point.trim() || !title.trim() || !endDate.trim()) return;
		setSubmitButtonDisabled(false);
	}, [formState]);
	return (
		<form onSubmit={onSubmit} className="space-y-[3rem]">
			<SelectGoalTypeArea value={formState.goalType} valueHandler={valueHandler} />
			<SelectCategoryArea value={formState.categoryType} valueHandler={valueHandler} />
			<SetGoalContentArea valueHandler={valueHandler} />
			<SetBallArea value={formState.point} valueHandler={pointHandler} />
			<SetTermArea valueHandler={onetimeGoalTermHandler} endDate={formState.endDate} goalType={formState.goalType} />
			<SelectReturnTypeArea value={formState.reward} valueHandler={valueHandler} />
			<SubmitButton isLoading={false} disabled={submitButtonDisabled}>
				등록하기
			</SubmitButton>
		</form>
	);
}

export default UploadGoal;

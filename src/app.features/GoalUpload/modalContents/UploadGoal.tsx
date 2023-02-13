import { useMutation } from '@tanstack/react-query';
import SubmitButton from 'app.components/SubmitButton';
import { postOnetimeGoal, PostOnetimeGoal } from 'app.modules/api/onetimeGoal';
import React, { useEffect, useReducer, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import SelectCategoryArea from '../components/SelectCategoryArea';
import SelectGoalTypeArea from '../components/SelectGoalTypeArea';
import SelectReturnTypeArea from '../components/SelectReturnTypeArea';
import SetBallArea from '../components/SetBallArea';
import SetGoalContentArea from '../components/SetGoalContentArea';
import SetTermArea from '../components/SetTermArea';
import { goalFormState } from '../store';
// TODO: 리코일 방식이 나을듯-> 리코일 방식으로 바꾸자

function UploadGoal() {
	console.log('upload-one-time-goal');
	const [goalForm, setGoalForm] = useRecoilState(goalFormState);
	const resetGoalForm = useResetRecoilState(goalFormState);
	const { mutate: postOnetimeGoalMutate, isLoading: isPostOnetimeGoalLoading } = useMutation(postOnetimeGoal, {
		onSuccess: (res) => {
			console.log(res);

			alert('일반목표등록완료');
			resetGoalForm();
		},
		onError: (error) => alert('오류 발생.'),
	});

	const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isPostOnetimeGoalLoading) return;
		console.log('submit', goalForm);
		const { endDate, title, content, categoryType, point, reward } = goalForm;
		const body = {
			endDate,
			title,
			content,
			categoryType,
			reward,
			point: `${+point * 100}`,
		};
		console.log(body);
		postOnetimeGoalMutate(body);
	};

	const valueHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setGoalForm({
			...goalForm,
			[name]: value,
		});
	};

	useEffect(() => {
		const { content, point, title, endDate } = goalForm;
		if (!content.trim() || !point.trim() || !title.trim() || !endDate.trim()) return;
		setSubmitButtonDisabled(false);
	}, [goalForm]);
	return (
		<form onSubmit={onSubmit} className="space-y-[3rem]">
			<SelectGoalTypeArea value={goalForm.goalType} valueHandler={valueHandler} />
			<SelectCategoryArea value={goalForm.categoryType} valueHandler={valueHandler} />
			<SetGoalContentArea valueHandler={valueHandler} />
			<SetBallArea />
			<SetTermArea />
			<SelectReturnTypeArea value={goalForm.reward} valueHandler={valueHandler} />
			<SubmitButton isLoading={false} disabled={submitButtonDisabled}>
				등록하기
			</SubmitButton>
		</form>
	);
}

export default UploadGoal;

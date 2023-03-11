import { useMutation } from '@tanstack/react-query';
import SubmitButton from 'app.components/SubmitButton';
import { postManytimeGoal, PostOnetimeGoal, postOnetimeGoal } from 'app.modules/api/goal';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import SelectCategoryArea from '../components/SelectCategoryArea';
import SelectGoalTypeArea from '../components/SelectGoalTypeArea';
import SelectReturnTypeArea from '../components/SelectReturnTypeArea';
import SetBallArea from '../components/SetBallArea';
import SetGoalContentArea from '../components/SetGoalContentArea';
import SetTermArea from '../components/SetTermArea';
import { goalFormState } from '../store';
// TODO: 잔여 포인트 확인

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
	const { mutate: postManytimeGoalMutate, isLoading: isPostManytimeGoalLoading } = useMutation(postManytimeGoal, {
		onSuccess: (res) => {
			console.log(res);

			alert('지속목표등록완료');
			resetGoalForm();
		},
		onError: (error) => alert('오류 발생.'),
	});

	const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isPostOnetimeGoalLoading || isPostManytimeGoalLoading) return;
		console.log('submit', goalForm);
		const { goalType, startDate, endDate, title, content, categoryType, point, reward, certDates } = goalForm;
		const body = {
			endDate,
			title,
			content,
			categoryType,
			reward,
			point: `${+point * 100}`,
		} as PostOnetimeGoal;
		console.log(body, certDates);

		if (goalType === 'onetime') {
			postOnetimeGoalMutate(body);
		} else {
			postManytimeGoalMutate({ ...body, certDates: [...certDates, endDate], startDate });
		}
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
		const { content, point, title, endDate, certDates, goalType, categoryType, reward } = goalForm;
		if (!content.trim() || !point.trim() || !title.trim() || !endDate.trim() || !categoryType || !reward) return;
		if (goalType === 'manytime' && certDates.length < 4) return;
		setSubmitButtonDisabled(false);
	}, [goalForm]);
	useEffect(() => {
		return () => resetGoalForm();
	}, []);
	return (
		<form onSubmit={onSubmit} className="space-y-[3rem]">
			<SelectGoalTypeArea value={goalForm.goalType} onChange={valueHandler} />
			<SelectCategoryArea value={goalForm.categoryType} onChange={valueHandler} />
			<SetGoalContentArea onChange={valueHandler} />
			<SetBallArea />
			<SetTermArea />
			<SelectReturnTypeArea />
			<SubmitButton isLoading={false} disabled={submitButtonDisabled}>
				등록하기
			</SubmitButton>
		</form>
	);
}

export default UploadGoal;

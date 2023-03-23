import { useMutation, QueryCache, useQueryClient } from '@tanstack/react-query';
import SubmitButton from 'app.components/SubmitButton';
import { postManytimeGoal, PostOnetimeGoal, postOnetimeGoal } from 'app.modules/api/goal';
import { useMyGoals } from 'app.modules/hooks/useMyGoals';
import { useRetchOnPostGoal } from 'app.modules/hooks/useRetchOnPostGoal';
import { getTodayString } from 'app.modules/utils/getTodayString';
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
	const queryClient = useQueryClient();

	const { mutate: postOnetimeGoalMutate, isLoading: isPostOnetimeGoalLoading } = useMutation(postOnetimeGoal, {
		onSuccess: async (res) => {
			console.log(res);
			// 캐시에 있는 모든 쿼리를 무효화한다.
			await queryClient.refetchQueries({ queryKey: ['myGoals', 'all'], type: 'active' });
			await queryClient.refetchQueries({ queryKey: ['user', 'statistics'], type: 'active' });
			await queryClient.refetchQueries({ queryKey: ['user', 'statistics', 'point'], type: 'active' });
			const { endDate, certDates } = res.data.data;
			console.log(endDate, certDates, 123);
			const todayString = getTodayString();
			// 목표가 당일 인증을 필요로 하는경우
			if (endDate === todayString || certDates?.includes(todayString)) {
				await queryClient.refetchQueries({ queryKey: ['user', 'statistics', 'todayCert'], type: 'active' });
			}
			alert('일반목표등록완료');
			resetGoalForm();
		},
		onError: (error) => alert('오류 발생.'),
	});
	const { mutate: postManytimeGoalMutate, isLoading: isPostManytimeGoalLoading } = useMutation(postManytimeGoal, {
		onSuccess: async (res) => {
			console.log(res);
			await queryClient.refetchQueries({ queryKey: ['myGoals', 'all'], type: 'active' });
			await queryClient.refetchQueries({ queryKey: ['user', 'statistics'], type: 'active' });
			await queryClient.refetchQueries({ queryKey: ['user', 'statistics', 'point'], type: 'active' });
			const { endDate, certDates } = res.data.data;
			console.log(endDate, certDates, 123);
			// 목표가 당일 인증을 필요로 하는경우 TODO: 최적화. 2개 미만 표시된  경우로 범위 축소 필요
			const todayString = getTodayString();
			if (endDate === todayString || certDates?.includes(todayString)) {
				await queryClient.refetchQueries({ queryKey: ['user', 'statistics', 'todayCert'], type: 'active' });
			}

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

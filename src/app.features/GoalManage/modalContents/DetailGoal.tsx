import { useMutation, useQueryClient } from '@tanstack/react-query';
import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import BoxContent from 'app.components/Box/common/BoxContent';
import BoxTitle from 'app.components/Box/common/BoxTitle';
import { postCert } from 'app.modules/api/certification';
import { patchHoldGoal } from 'app.modules/api/goal';
import { ReactComponent as BlackBallIcon } from 'app.modules/assets/icons/ball/blackBall.svg';
import { getDayDiff } from 'app.modules/utils/getDayDiff';
import { getTodayString } from 'app.modules/utils/getTodayString';
import React, { useState } from 'react';
import CertContent from '../components/CertContent';
import CertDateList from '../components/CertDateList';
import CertImage from '../components/CertImage';
import LeaveAlertModal from '../components/LeaveAlertModal';
import { CategoryType, GoalDataType, GoalStateType, MappedCategory, MappedReward, RewardType } from '../types';
import { getDdayMessage } from '../utils/getDdayMessage';

// TODO:1. 목표 플로우
// TODO: 인증 없어서 실패한 경우 처리(인증 내용,사진)

interface Props {
	goal: GoalDataType;
	onCloseModal: () => void;
}
// TODO: svg 포맷 다른 포맷으로 처리하기
// TODO: 가장 마지막으로 올린 인증 focusing 하기
function DetailGoal({ goal, onCloseModal }: Props) {
	console.log('detail-goal');
	const queryClient = useQueryClient();

	const { mutate: postCertMutate, isLoading } = useMutation(postCert, {
		onSuccess: async (res) => {
			console.log(res);
			await queryClient.refetchQueries({ queryKey: ['myGoals', 'all'], type: 'active' });
			// aside 업데이트 TODO: 최적화 aside에 표시된 골일때 refetch로 범위 축소 필요
			await queryClient.refetchQueries({ queryKey: ['user', 'statistics', 'todayCert'], type: 'active' });
			onCloseModal();
			alert('인증등록완료');
			//resetGoalForm();
		},
		onError: (error) => alert('오류 발생.'),
	});
	const { mutate: patchHoldGoalMutate, isLoading: patchHoldGoalLoading } = useMutation(patchHoldGoal, {
		onSuccess: async (res) => {
			console.log(res);
			// TODO: 검토 요청 완료후 포인트 돌아오는지 확인하기
			await queryClient.refetchQueries({ queryKey: ['user', 'statistics'], type: 'active' });
			onCloseModal();
			alert('검토요청 완료');
			//resetGoalForm();
		},
		onError: (error) => alert('오류 발생.'),
	});

	const [certContent, setCertContent] = useState<string>('');
	const [certImage, setCertImage] = useState<File>();
	const [certImagePreview, setCertImagePreview] = useState<string | null>('');
	const [isAlertModalOpen, setIsAlertModalOpen] = useState<{
		alertTitle: string;
		alertSubTitle: string;
		confirmActionText: string;
		onConfirmAction: () => void;
	} | null>(null);
	const todayString = getTodayString();

	const isManyTimeGoal = () => {
		return goal.certDates !== undefined;
	};
	const getInitFocusCert = () => {
		let result = 0;
		const { certDates } = goal;
		if (certDates === undefined) return result;
		for (let i = certDates.length - 1; i >= 0; i -= 1) {
			if (getDayDiff(todayString, certDates[i]) <= 0) {
				result = i;
				return result;
			}
		}
		return result;
	};
	const [selectedCertIdx, setSelectedCertIdx] = useState<number>(getInitFocusCert());
	const certSubmitDisabled = !goal?.id || !certContent.trim() || !certImage;

	const selectCertHandler = (index: number) => {
		setSelectedCertIdx(index);
	};
	const getFocusedCert = () => {
		const cert = goal.certifications?.filter(
			(item) => item.date === (goal.certDates ?? [goal.endDate])[selectedCertIdx]
		);

		if (cert?.length) {
			return cert[0];
		}

		return null;
	};
	const certImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const img = e.target?.files?.[0];
		if (!img) return;
		setCertImage(img);
		const reader = new FileReader();

		reader.readAsDataURL(img);
		reader.onloadend = () => {
			if (!reader?.result) return;
			setCertImagePreview(reader.result as string);
		};
	};
	const certContentHanlder = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCertContent(e.target.value);
	};
	const certSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (isLoading) return;
		const goalType: 'oneTime' | 'manyTime' = isManyTimeGoal() ? 'manyTime' : 'oneTime';
		if (certSubmitDisabled) return;
		const formData = new FormData();
		formData.append('goalType', goalType);
		formData.append('content', certContent);
		formData.append('picture', certImage);
		formData.append('goalId', `${goal.id}`);
		/*const body = {
			goalType,
			goalId: goal.id,
			content: certContent,
			picture: certImage,
		};*/
		console.log(formData.get('picture'), certImage);
		postCertMutate(formData);
	};
	// TODO:  인증 글 업로드 중에 바깥 영역 클릭했을때 경고모달 띄우기
	return (
		<div className="space-y-[3.2rem]">
			{isAlertModalOpen && <LeaveAlertModal onCancel={() => setIsAlertModalOpen(null)} {...isAlertModalOpen} />}
			<div className="flex justify-between max-h-[9.5rem]">
				<BoxTitle title={goal.title} />
				<div className="w-[46.4rem]  flex flex-col justify-between">
					<BoxContent content={goal.content} />
					<div className="flex justify-between items-center">
						<div className="flex space-x-[0.8rem]">
							<Badge bgColor="bg-buttonGray-200">{MappedCategory[goal.categoryType as CategoryType]}</Badge>
							<Badge bgColor="bg-buttonGray-200" className="pc:text-body2-pc flex items-center  space-x-[0.8rem] ">
								<div className="flex items-center space-x-[0.2rem]">
									<span>{goal.point}</span>

									<BlackBallIcon className="w-[1.8rem] h-[1.8rem] mt-[0.3rem]" />
								</div>
								<div className="w-[0.1rem] h-full bg-[#D3D3D3]" />
								<span>{MappedReward[goal?.reward as RewardType]}</span>
							</Badge>
						</div>
						{/* TODO: 컴포넌트 만들기 */}
						<div className="pc:text-body2-pc">
							🗓{' '}
							{getDdayMessage({
								goalState: goal.goalState as GoalStateType,
								endDate: goal.endDate,
								isManyTimeGoal: isManyTimeGoal(),
								certDates: goal.certDates,
								todayString,
							})}
						</div>
					</div>
				</div>
			</div>

			<form className="space-y-[3.2rem]" onSubmit={certSubmitHandler}>
				<div className="flex justify-between items-start h-[28.1rem]">
					<CertDateList
						{...goal}
						focusedCertDate={getFocusedCert()?.date ?? goal?.certDates?.[selectedCertIdx] ?? goal?.endDate}
						todayString={`${todayString}`}
						onSelectCert={selectCertHandler}
					/>
					<CertImage
						todayString={todayString}
						certification={getFocusedCert()}
						certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
						onCertImageChange={certImageHandler}
						certImagePreview={certImagePreview as string}
						point={goal?.point}
					/>
				</div>
				<CertContent
					todayString={todayString}
					focusedCert={getFocusedCert()}
					certDate={(goal?.certDates ?? [goal.endDate])[selectedCertIdx]}
					onCertContentChange={certContentHanlder}
					certContent={certContent}
				/>
				<div className="flex space-x-[1.6rem]">
					{goal.holdable && goal.goalState === 'FAIL' && getDayDiff(todayString, goal.endDate) <= 0 && (
						<Button
							onClick={() => {
								if (patchHoldGoalLoading || !goal?.id) return;
								patchHoldGoalMutate(goal.id);
							}}
							type="button"
							variant="solid"
							size="lg"
							bgColor="bg-buttonRed-100"
							textColor="text-buttonRed-200"
							className="min-w-[19.1rem] w-[19.1rem]"
						>
							검토 요청
						</Button>
					)}
					<Button type="button" variant="solid" size="lg" bgColor="bg-buttonGray-200">
						닫기
					</Button>
					{/*인증날인데 올라온 인증이 없는 상태 */}
					{getFocusedCert() === null && (goal.certDates ?? [goal.endDate])[selectedCertIdx] === todayString && (
						<Button
							onClick={(e) => {
								setIsAlertModalOpen({
									alertTitle: '인증을 완료하시겠어요?',
									alertSubTitle: '인증 후에는 수정이 불가능합니다.',
									confirmActionText: '인증하기',
									onConfirmAction: () => certSubmitHandler(e),
								});
							}}
							type="button"
							variant="outline"
							size="lg"
							disabled={certSubmitDisabled}
							borderColor={certSubmitDisabled ? 'border-primaryBlack-300' : 'border-primaryOrange-200'}
							textColor={certSubmitDisabled ? 'text-primaryBlack-300' : 'text-primaryOrange-200'}
							className="min-w-[46.3rem]"
						>
							인증하기
						</Button>
					)}
				</div>
			</form>
		</div>
	);
}

export default DetailGoal;

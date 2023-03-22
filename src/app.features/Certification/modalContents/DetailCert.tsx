import { useMutation, useQueryClient } from '@tanstack/react-query';
import Badge from 'app.components/App.base/Badge';
import Button from 'app.components/App.base/Button';
import BoxContent from 'app.components/Box/common/BoxContent';
import BoxTitle from 'app.components/Box/common/BoxTitle';
import CertDateList from 'app.features/GoalManage/components/CertDateList';
import { CategoryType, CertType, GoalDataType, MappedCategory } from 'app.features/GoalManage/types';
import { postVerification } from 'app.modules/api/certification';
import { getProgressText } from 'app.modules/utils/getRequireSuccess';
import { getTodayString } from 'app.modules/utils/getTodayString';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CertContent from '../components/CertContent';
import CertImage from '../components/CertImage';
import { CertDataType } from '../types';

interface Props {
	certData: CertDataType; // TODO:  goalData 빼기
	goal: GoalDataType;
	dday: number;
	onCloseModal: () => void;
}
// TODO: 검증하고 인증목록 refetch , 검증 count refetch
function DetailCert({ certData, goal, dday, onCloseModal }: Props) {
	console.log('detail-cert', certData, goal);
	const queryClient = useQueryClient();

	const { mutate: postVerificationMutate, isLoading } = useMutation(postVerification, {
		onSuccess: async (res) => {
			const category = new URL(document.location.toString()).searchParams.get('category');
			console.log('certs', category ?? 'all');
			await queryClient.refetchQueries({ queryKey: ['user', 'statistics', 'point'], type: 'active' });
			await queryClient.refetchQueries({ queryKey: ['certs', category ?? 'all'], type: 'active' });
			onCloseModal();
			alert('검증 완료');
			//resetGoalForm();
		},
		onError: (error) => alert('오류 발생.'),
	});
	const todayString = getTodayString();

	const judgeSubmitHandler = (state: boolean) => {
		console.log('제출');
		if (!certData?.id) return;
		if (isLoading) return;
		const body = {
			certificationId: certData.id,
			state,
		};
		postVerificationMutate(body);
	};

	return (
		<div className="space-y-[3.2rem]">
			<div className="flex justify-between max-h-[9.5rem]">
				<BoxTitle title={goal.title} />
				<div className="w-[46.4rem] h-[9.5rem] flex flex-col justify-between">
					<BoxContent content={goal.content} />

					<div className="flex justify-between items-center">
						<div className="flex space-x-[0.8rem]">
							<Badge bgColor="bg-buttonGray-200">{MappedCategory[goal.categoryType as CategoryType]}</Badge>
							<Badge bgColor="bg-buttonRed-100" textColor="text-buttonRed-200">
								{getProgressText(goal.point, certData.successCount)}
							</Badge>
						</div>
						{/* TODO: 컴포넌트 만들기 */}
						<div className="pc:text-body2-pc">⏰ D-{dday}</div>
					</div>
				</div>
			</div>

			<div className="space-y-[3.2rem]">
				<div className="flex justify-between items-start h-[28.1rem]">
					<CertDateList
						certDates={goal?.certDates}
						certifications={goal?.certifications ?? certData?.relatedCertifications}
						endDate={goal?.endDate}
						todayString={`${todayString}`}
						focusedCertDate={certData.date}
						isCertPost
						clickDisabled
					/>
					<CertImage picture={certData.picture} />
				</div>
				<CertContent content={certData.content} />
				<div className="flex w-full space-x-[1.6rem]">
					<Button onClick={() => onCloseModal()} type="button" variant="solid" size="lg" bgColor="bg-buttonGray-200">
						닫기
					</Button>
					<div className="flex space-x-[0.8rem] min-w-[46.2rem]">
						<Button
							onClick={() => judgeSubmitHandler(false)}
							type="submit"
							variant="solid"
							size="lg"
							bgColor="bg-buttonGray-300"
							textColor="text-buttonGray-400"
						>
							실패
						</Button>
						<Button
							onClick={() => judgeSubmitHandler(true)}
							type="submit"
							variant="solid"
							size="lg"
							bgColor="bg-primaryOrange-200"
							textColor="text-white"
						>
							성공
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailCert;

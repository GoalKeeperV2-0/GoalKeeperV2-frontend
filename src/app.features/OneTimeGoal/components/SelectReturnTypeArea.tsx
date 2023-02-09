import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import React, { useState } from 'react';
type RewardType = 'HIGH_RETURN' | 'LOW_RETURN';
type MappedReward = { [K in RewardType]: string };

function SelectReturnTypeArea() {
	const [rewardType, setRewardType] = useState<RewardType>('HIGH_RETURN');
	// TODO: 초기화 방법 더 알아보기
	const reward: MappedReward = {
		HIGH_RETURN: '하이리스크 하이리턴',
		LOW_RETURN: '로우리스트 로우리턴',
	};
	return (
		<div className="space-y-[2.4rem] w-full">
			<Label required htmlFor="return-type" content="달성시 추가금 방식" />
			<div className="flex space-x-[2.3rem]">
				{Object.entries(reward).map(([type, content]) => (
					<Button
						key={type}
						onClick={() => setRewardType(type as RewardType)}
						name="selectReturnType"
						value={`${type}Goal`}
						variant={rewardType === type ? 'solid' : 'outline'}
						size="lg"
						bgColor={rewardType === type ? 'bg-primaryOrange-200' : null}
						textColor={rewardType === type ? 'text-white' : 'text-primaryOrange-200'}
						borderColor={rewardType === type ? null : 'border-primaryOrange-200'}
						ariaPressed={rewardType === type}
						className="text-start pl-[2.4rem]"
					>
						{content}
					</Button>
				))}
			</div>
		</div>
	);
}

export default SelectReturnTypeArea;

import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import SubmitButton from 'app.components/SubmitButton';
import React, { useState } from 'react';
import SelectCategoryArea from '../components/SelectCategoryArea';
import SelectGoalTypeArea from '../components/SelectGoalTypeArea';
import SelectReturnTypeArea from '../components/SelectReturnTypeArea';
import SetBallArea from '../components/SetBallArea';
import SetGoalContentArea from '../components/SetGoalContentArea';
import SetTermArea from '../components/SetTermArea';

function UploadOnetimeGoal() {
	console.log('upload-one-time-goal');
	return (
		<div className="space-y-[3rem]">
			<SelectGoalTypeArea />
			<SelectCategoryArea value="" />
			<SetGoalContentArea />
			<SetBallArea />
			<SetTermArea />
			<SelectReturnTypeArea />
			<SubmitButton isLoading={false} disabled={false}>
				등록하기
			</SubmitButton>
		</div>
	);
}

export default UploadOnetimeGoal;

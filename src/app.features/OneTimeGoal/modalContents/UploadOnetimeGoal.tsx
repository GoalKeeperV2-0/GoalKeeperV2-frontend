import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import React, { useState } from 'react';
import SelectCategoryArea from '../components/SelectCategoryArea';
import SelectGoalTypeArea from '../components/SelectGoalTypeArea';
import SetGoalContentArea from '../components/SetGoalContentArea';

function UploadOnetimeGoal() {
	console.log('upload-one-time-goal');
	return (
		<div className="space-y-[3rem]">
			<SelectGoalTypeArea />
			<SelectCategoryArea value="" />
			<SetGoalContentArea />
		</div>
	);
}

export default UploadOnetimeGoal;

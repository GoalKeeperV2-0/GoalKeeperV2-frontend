import Button from 'app.components/App.base/Button';
import Label from 'app.components/App.base/Input/Label';
import React, { useState } from 'react';
import SelectGoalTypeArea from '../components/SelectGoalTypeArea';

function UploadOnetimeGoal() {
	console.log('upload-one-time-goal');
	return (
		<>
			<SelectGoalTypeArea />
		</>
	);
}

export default UploadOnetimeGoal;

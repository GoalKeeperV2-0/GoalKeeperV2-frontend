import BaseLayout from 'app.components/BaseLayout';
import ManageGoalScreen from 'app.features/GoalManage/screens/ManageGoalScreen';
import React from 'react';

function ManageGoalPage() {
	return (
		<BaseLayout>
			<ManageGoalScreen />
		</BaseLayout>
	);
}

export default ManageGoalPage;

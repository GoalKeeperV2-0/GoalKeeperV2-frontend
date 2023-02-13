import { CategoryType, GoalType, PostManyTimeGoal } from 'app.modules/api/onetimeGoal';
import { atom } from 'recoil';
export interface IGoalForm extends PostManyTimeGoal {
	goalType: GoalType;
}
const initState: IGoalForm = {
	goalType: 'onetime',
	startDate: '',
	endDate: '', // '2023-02-13'
	title: '',
	content: '',
	certDates: [],
	categoryType: 'EXERCISE',
	point: '',
	reward: 'HIGH_RETURN',
};
export const goalFormState = atom<IGoalForm>({
	key: 'goalFormState',
	default: initState,
});

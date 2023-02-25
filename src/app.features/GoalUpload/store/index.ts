import { GoalType, PostManyTimeGoal } from 'app.modules/api/goal';
import { atom } from 'recoil';
export interface IGoalForm {
	goalType: GoalType;
	startDate: PostManyTimeGoal['startDate'];
	endDate: PostManyTimeGoal['endDate']; // '2023-02-13'
	title: PostManyTimeGoal['title'];
	content: PostManyTimeGoal['content'];
	certDates: PostManyTimeGoal['certDates'];
	categoryType: PostManyTimeGoal['categoryType'] | null;
	point: PostManyTimeGoal['point'];
	reward: PostManyTimeGoal['reward'] | null;
}
const initState: IGoalForm = {
	goalType: 'onetime',
	startDate: '',
	endDate: '', // '2023-02-13'
	title: '',
	content: '',
	certDates: [],
	categoryType: null,
	point: '',
	reward: null,
};
export const goalFormState = atom<IGoalForm>({
	key: 'goalFormState',
	default: initState,
});

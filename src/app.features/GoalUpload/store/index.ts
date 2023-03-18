import { GoalType, PostManyTimeGoal } from 'app.modules/api/goal';
import { getTodayString } from 'app.modules/utils/getTodayString';
import { atom } from 'recoil';
export interface IGoalForm {
	goalType: GoalType | null;
	startDate: PostManyTimeGoal['startDate'];
	endDate: PostManyTimeGoal['endDate']; // '2023-02-13'
	title: PostManyTimeGoal['title'];
	content: PostManyTimeGoal['content'];
	certDates: PostManyTimeGoal['certDates'];
	categoryType: PostManyTimeGoal['categoryType'];
	point: PostManyTimeGoal['point'];
	reward: PostManyTimeGoal['reward'];
}
const initState: IGoalForm = {
	goalType: 'onetime',
	startDate: getTodayString(),
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

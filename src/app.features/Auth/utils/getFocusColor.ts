import { INVALID_COLOR, VALID_COLOR } from '../constants';

export const getFocusColor = (isValid: boolean | null) => {
	if (isValid === null) {
		return null;
	}
	if (isValid) return VALID_COLOR;
	return INVALID_COLOR;
};

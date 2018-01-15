import {
	GET_DATA_FAILED,
	GET_DATA_SUCCESS,
	ACTIVE_ROUTE_CHANGED,
	TOGGLE_WORKED_IN_NORWAY_LAST_TWELVE_MONTHS,
	SET_NUMBER_OF_CHILDREN,
	APPROVE_CONDITIONS,
	CONFIRM_INFORMATION,
	SET_BEKREFTET_TERMIN_DATO,
	SET_TERMIN_DATO,
	TOGGLE_CHILD_BORN,
	TOGGLE_OPPHOLD_NAA,
	TOGGLE_RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS,
	TOGGLE_RESIDING_IN_NORWAY_NEXT_TWELVE_MONTHS,
	TOGGLE_RESIDING_IN_NORWAY_DURING_BIRTH
} from '../constants/index';

import { shouldShowStepper } from '../util';

const defaultState = {
	activeRoute: null,
	showStepper: true
};

const newState = (state) => ({
	...state,
	showStepper: shouldShowStepper(state.activeRoute, state)
});

const engangsstonadReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ACTIVE_ROUTE_CHANGED: {
			const { route } = action;
			return newState({ ...state, activeRoute: route });
		}
		case APPROVE_CONDITIONS: {
			return newState({
				...state,
				approvedConditions: !state.approvedConditions
			});
		}
		case CONFIRM_INFORMATION: {
			return newState({
				...state,
				confirmedInformation: !state.confirmedInformation
			});
		}
		case TOGGLE_CHILD_BORN: {
			return newState({ ...state, childBorn: action.data });
		}
		case SET_NUMBER_OF_CHILDREN: {
			return newState({ ...state, noOfChildren: action.data });
		}
		case SET_TERMIN_DATO: {
			return newState({ ...state, terminDato: action.data });
		}
		case SET_BEKREFTET_TERMIN_DATO: {
			return newState({ ...state, bekreftetTermindato: action.data });
		}
		case TOGGLE_RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS: {
			return newState({
				...state,
				residedInNorwayLastTwelveMonths: action.data,
				workedInNorwayLastTwelveMonths:
					defaultState.workedInNorwayLastTwelveMonths
			});
		}
		case TOGGLE_WORKED_IN_NORWAY_LAST_TWELVE_MONTHS: {
			return newState({
				...state,
				workedInNorwayLastTwelveMonths: action.data
			});
		}
		case TOGGLE_RESIDING_IN_NORWAY_NEXT_TWELVE_MONTHS: {
			return newState({
				...state,
				residingInNorwayNextTwelveMonths: action.data
			});
		}
		case TOGGLE_RESIDING_IN_NORWAY_DURING_BIRTH: {
			return newState({
				...state,
				residingInNorwayDuringBirth: action.data
			});
		}
		case TOGGLE_OPPHOLD_NAA: {
			return newState({ ...state, oppholdNaa: action.data });
		}
		case GET_DATA_SUCCESS: {
			return newState({ ...state, data: action.data });
		}
		case GET_DATA_FAILED: {
			return newState({ ...state, error: action.error });
		}
		default:
			return state;
	}
};

export default engangsstonadReducer;
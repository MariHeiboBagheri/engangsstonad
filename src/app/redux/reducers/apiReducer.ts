import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';
import Person from '../../types/domain/Person';

const getDefaultState = (): ApiReducerState => ({
    isLoadingPerson: false,
    søknadSendt: false,
    vedleggStored: false,
    søknadSendingInProgress: false,
    person: undefined
});

export interface ApiReducerState {
    isLoadingPerson: boolean;
    søknadSendt: boolean;
    vedleggStored: boolean;
    søknadSendingInProgress: boolean;
    person?: Person;
}

const apiReducer = (state = getDefaultState(), action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActionKeys.GET_PERSON:
            return {...state, params: action.params, isLoadingPerson: true};
        case ApiActionKeys.GET_PERSON_SUCCESS:
            return {...state, person: action.person, isLoadingPerson: false};
        case ApiActionKeys.GET_PERSON_FAILED:
            return {
                ...state,
                error: action.error.response,
                isLoadingPerson: false
            };
        case ApiActionKeys.SEND_SOKNAD:
            return {
                ...state,
                soknad: action.soknad,
                søknadSendingInProgress: true
            };
        case ApiActionKeys.SEND_SOKNAD_SUCCESS:
            return {
                ...state,
                kvittering: action.kvittering,
                søknadSendt: true,
                søknadSendingInProgress: false
            };
        case ApiActionKeys.SEND_SOKNAD_FAILED:
            return {
                ...state,
                error: action.error.response,
                søknadSendt: true,
                søknadSendingInProgress: false
            };
        case ApiActionKeys.SAVE_VEDLEGG_SUCCESS:
            return {
                ...state,
                vedleggURL: action.uri,
            };
        case ApiActionKeys.SAVE_VEDLEGG_FAILED:
            return {
                ...state,
                error: action.error.response,
            };
    }
    return state;
};

export default apiReducer;

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys, GetPersonActionType } from '../actions/api/apiActionDefinitions';
import { EngangsstonadSoknadResponse } from '../../types/services/EngangsstonadSoknadResponse';
import apiUtils from './../../util/apiUtils';
import { SoknadActionKeys } from 'actions/soknad/soknadActionDefinitions';

// tslint:disable-next-line:no-any
function* getPerson(action: any) {
    try {
        const response = yield call(Api.getPerson, action.params);
        const person: GetPersonActionType = response.data;
        yield put({type: ApiActionKeys.GET_PERSON_SUCCESS, person});
    } catch (error) {
        yield put({type: ApiActionKeys.GET_PERSON_FAILED, error});
    }
}

// tslint:disable-next-line:no-any
function* sendSoknad(action: any) {
    try {
        const response = yield call(Api.sendSoknad, apiUtils.cleanupSøknad(action.soknad), action.vedlegg);
        const kvittering: EngangsstonadSoknadResponse = response.data;
        yield put({type: ApiActionKeys.SEND_SOKNAD_SUCCESS, kvittering});
    } catch (error) {
        yield put({type: ApiActionKeys.SEND_SOKNAD_FAILED, error});
    }
}

// tslint:disable-next-line:no-any
function* saveVedlegg(action: any) {
    try {
        const response = yield call(Api.saveVedlegg, action.vedlegg);
        const uri: URL = response.headers.location;

        yield put({type: ApiActionKeys.SAVE_VEDLEGG_SUCCESS, uri});
    } catch (error) {
        yield put({type: ApiActionKeys.SAVE_VEDLEGG_FAILED, error});
    }
}

// tslint:disable-next-line:no-any
function* saveSoknad(action: any) {
    try {
        const response = yield call(Api.saveSoknad, action.soknad, action.vedlegg);
        const kvittering: any = response.data;
        yield put({type: ApiActionKeys.SAVE_SOKNAD_SUCCESS, kvittering});
    } catch (error) {
        yield put({type: ApiActionKeys.SAVE_SOKNAD_FAILED, error});
    }
}

// tslint:disable-next-line:no-any
function* getSoknad(action: any) {
    try {
        const response = yield call(Api.getSoknad);
        const soknad: any = response.data;
        yield put({type: SoknadActionKeys.RESTORE_SØKNAD, soknad});
    } catch (error) {
        yield put({type: ApiActionKeys.GET_SOKNAD_FAILED, error});
    }
}

export default function* sagas() {
    yield all([
        takeEvery(ApiActionKeys.GET_PERSON, getPerson),
        takeEvery(ApiActionKeys.SEND_SOKNAD, sendSoknad),
        takeEvery(ApiActionKeys.SAVE_SOKNAD, saveSoknad),
        takeLatest(ApiActionKeys.GET_SOKNAD, getSoknad),
        takeLatest(ApiActionKeys.SAVE_VEDLEGG, saveVedlegg)
    ]);
}

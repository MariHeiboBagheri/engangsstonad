// tslint:disable-next-line:no-any
import apiUtils from 'util/apiUtils';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import Api from '../../api/api';
import { EngangsstonadSoknadResponse } from '../../types/services/EngangsstonadSoknadResponse';
import { ApiActionKeys } from 'actions/api/apiActionDefinitions';

function* sendSøknad(action: any) {
    try {
        console.log('Im here with action', action);
        const response = yield call(Api.sendSoknad, apiUtils.cleanupSøknad(action.soknad), action.vedlegg);
        console.log('Im here with response', response);
        const kvittering: EngangsstonadSoknadResponse = response.data;
        yield put({ type: ApiActionKeys.SEND_SOKNAD_SUCCESS, kvittering });
    } catch (error) {
        yield put({ type: ApiActionKeys.SEND_SOKNAD_FAILED, error });
    }
}

export default function* søknadSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SOKNAD, sendSøknad)]);
}

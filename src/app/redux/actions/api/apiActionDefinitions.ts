import Person from '../../../types/domain/Person';
import { default as EngangsstonadSoknad } from '../../../types/domain/EngangsstonadSoknad';
import { EngangsstonadSoknadResponse } from '../../../types/services/EngangsstonadSoknadResponse';
import PersonRequest from '../../../types/services/PersonRequest';

export enum ApiActionKeys {
    'GET_SOKNAD' = 'getSoknad',
    'GET_SOKNAD_SUCCESS' = 'getSoknadSuccess',
    'GET_SOKNAD_FAILED' = 'getSoknadFailed',
    'SAVE_SOKNAD' = 'saveSoknad',
    'SAVE_SOKNAD_SUCCESS' = 'saveSoknadSuccess',
    'SAVE_SOKNAD_FAILED' = 'saveSoknadFailed',
    'SAVE_VEDLEGG' = 'saveVedlegg',
    'SAVE_VEDLEGG_SUCCESS' = 'saveVedleggSuccess',
    'SAVE_VEDLEGG_FAILED' = 'saveVedleggFailed',
    'GET_PERSON' = 'getPerson',
    'GET_PERSON_SUCCESS' = 'getPersonSuccess',
    'GET_PERSON_FAILED' = 'getPersonFailed',
    'SEND_SOKNAD' = 'sendSoknad',
    'SEND_SOKNAD_SUCCESS' = 'sendSoknadSuccess',
    'SEND_SOKNAD_FAILED' = 'sendSoknadFailed'
}

interface GetPerson {
    type: ApiActionKeys.GET_PERSON;
    params?: PersonRequest;
}

interface GetPersonSuccess {
    type: ApiActionKeys.GET_PERSON_SUCCESS;
    person: Person;
}

interface GetPersonFailed {
    type: ApiActionKeys.GET_PERSON_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

interface SendSoknad {
    type: ApiActionKeys.SEND_SOKNAD;
    soknad: EngangsstonadSoknad;
}

interface SendSoknadSuccess {
    type: ApiActionKeys.SEND_SOKNAD_SUCCESS;
    kvittering: EngangsstonadSoknadResponse;
}

interface SendSoknadFailed {
    type: ApiActionKeys.SEND_SOKNAD_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

interface GetSoknad {
    type: ApiActionKeys.GET_SOKNAD;
}

interface GetSoknadSuccess {
    type: ApiActionKeys.GET_SOKNAD_SUCCESS;
    soknad: EngangsstonadSoknad;
}

interface GetSoknadFailed {
    type: ApiActionKeys.GET_SOKNAD_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

interface SaveSoknad {
    type: ApiActionKeys.SAVE_SOKNAD;
    soknad: EngangsstonadSoknad;
}

interface SaveSoknadSuccess {
    type: ApiActionKeys.SAVE_SOKNAD_SUCCESS;
    kvittering: any;
}

interface SaveSoknadFailed {
    type: ApiActionKeys.SAVE_SOKNAD_FAILED;
    error: any;
}

interface SaveVedlegg {
    type: ApiActionKeys.SAVE_VEDLEGG;
    vedlegg: File;
}

interface SaveVedleggSuccess {
    type: ApiActionKeys.SAVE_VEDLEGG_SUCCESS;
    uri: URL;
}

interface SaveVedleggFailed {
    type: ApiActionKeys.SAVE_VEDLEGG_FAILED;
    error: any;
}

export type GetPersonActionType = GetPersonSuccess | GetPersonFailed;
export type SendSoknadActionType = SendSoknadSuccess | SendSoknadFailed;
export type SaveSoknadActionType = SaveSoknadSuccess | SaveSoknadFailed;
export type SaveVedleggActionType = SaveVedleggSuccess | SaveVedleggFailed;
export type GetSoknadActionType = GetSoknadSuccess | GetSoknadFailed;

export type ApiActionTypes =
    | GetPerson
    | GetPersonSuccess
    | GetPersonFailed
    | SendSoknad
    | SendSoknadSuccess
    | SendSoknadFailed
    | SaveSoknad
    | SaveSoknadSuccess
    | SaveSoknadFailed
    | SaveVedlegg
    | SaveVedleggSuccess
    | SaveVedleggFailed
    | GetSoknad
    | GetSoknadFailed
    | GetSoknadSuccess;

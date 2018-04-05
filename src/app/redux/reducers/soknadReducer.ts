import { SoknadActionKeys, SoknadActionTypes } from '../actions/soknad/soknadActionDefinitions';
import EngangsstonadSoknad from '../../types/domain/EngangsstonadSoknad';

const getDefaultState = () => {
    const engangsstonadSoknad: EngangsstonadSoknad = {
        barn: {
            fødselsdatoer: []
        },
        utenlandsopphold: {
            tidligerePerioder: [],
            senerePerioder: []
        },
        vedlegg: [] as File[],
        annenForelder: {}
    };
    return engangsstonadSoknad;
};

const soknadReducer = (state = getDefaultState(), action: SoknadActionTypes) => {
    let { barn, utenlandsopphold, vedlegg } = state;
    switch (action.type) {
        case SoknadActionKeys.ADD_VEDLEGG:
            const vedleggMetaData = vedlegg.map((file: File) => (
                JSON.stringify({
                    name: file.name,
                    size: file.size
                })
            ));

            const newVedlegg = action.vedlegg.filter((file: File) => {
                return (!vedleggMetaData.includes(JSON.stringify({
                    name: file.name,
                    size: file.size
                })
                ));
            });

            return {
                ...state,
                vedlegg: vedlegg.concat(newVedlegg)
            };
        case SoknadActionKeys.DELETE_VEDLEGG:
            return {
                ...state,
                vedlegg: vedlegg.filter((file: File) => {
                    return file !== action.vedlegg;
                })
            };
        case SoknadActionKeys.ADD_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            const tidligerePerioder = utenlandsopphold.tidligerePerioder.concat([action.periode]);
            return { ...state, utenlandsopphold: { ...utenlandsopphold, tidligerePerioder } };
        case SoknadActionKeys.EDIT_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            utenlandsopphold.tidligerePerioder[action.index] = action.periode;
            return { ...state, utenlandsopphold };
        case SoknadActionKeys.DELETE_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            return {
                ...state,
                utenlandsopphold: {
                    ...utenlandsopphold,
                    tidligerePerioder: utenlandsopphold.tidligerePerioder.filter((opphold) => {
                        return opphold.land !== action.periode.land;
                    })
                }
            };

        case SoknadActionKeys.ADD_SENERE_UTENLANDSOPPHOLD_PERIODE:
            const senerePerioder = utenlandsopphold.senerePerioder.concat([action.periode]);
            return { ...state, utenlandsopphold: { ...utenlandsopphold, senerePerioder } };
        case SoknadActionKeys.EDIT_SENERE_UTENLANDSOPPHOLD_PERIODE:
            utenlandsopphold.senerePerioder[action.index] = action.periode;
            return { ...state, utenlandsopphold };
        case SoknadActionKeys.DELETE_SENERE_UTENLANDSOPPHOLD_PERIODE:
            return {
                ...state,
                utenlandsopphold: {
                    ...utenlandsopphold,
                    senerePerioder: utenlandsopphold.senerePerioder.filter((opphold) => {
                        return opphold.land !== action.periode.land;
                    })
                }
            };

        case SoknadActionKeys.SET_JOBBET_I_NORGE_SISTE_12_MND:
            const { jobbetINorgeSiste12Mnd } = action;
            return { ...state, utenlandsopphold: { ...utenlandsopphold, jobbetINorgeSiste12Mnd } };
        case SoknadActionKeys.SET_FODSEL_I_NORGE:
            const { fødselINorge } = action;
            return { ...state, utenlandsopphold: { ...utenlandsopphold, fødselINorge } };
        case SoknadActionKeys.SET_I_NORGE_SISTE_12_MND:
            const { iNorgeSiste12Mnd } = action;
            return { ...state, utenlandsopphold: { ...getDefaultState().utenlandsopphold, iNorgeSiste12Mnd } };
        case SoknadActionKeys.SET_I_NORGE_NESTE_12_MND:
            const { iNorgeNeste12Mnd } = action;
            return {
                ...state,
                utenlandsopphold: {
                    ...utenlandsopphold,
                    iNorgeNeste12Mnd,
                    fødselINorge: undefined,
                    senerePerioder: getDefaultState().utenlandsopphold.senerePerioder
                }
            };
        case SoknadActionKeys.SET_ER_BARNET_FODT:
            const { erBarnetFødt } = action;
            return { ...state, barn: { fødselsdatoer: [], erBarnetFødt }, vedlegg: [], utenlandsopphold: { ...utenlandsopphold, fødselINorge: undefined } };
        case SoknadActionKeys.SET_ANTALL_BARN:
            return { ...state, barn: { ...barn, antallBarn: action.antallBarn } };
        case SoknadActionKeys.EDIT_FØDSELSDATO:
            const { index, fødselsdato } = action;
            if (action.bornOnSameDate) {
                return { ...state, barn: { ...barn, fødselsdatoer: state.barn.fødselsdatoer.slice().fill(fødselsdato) } };
            } else if (index !== undefined) {
                state.barn.fødselsdatoer[index] = fødselsdato;
                return { ...state, barn: { ...barn, fødselsdatoer: state.barn.fødselsdatoer }};
            }
            break;
        case SoknadActionKeys.UPDATE_FØDSELSDATOER:
            const { fødselsdatoer, antallBarn } = state.barn;
            let newFødselsdatoArray = [];
            if (antallBarn && fødselsdatoer.length > antallBarn) {
                newFødselsdatoArray = state.barn.fødselsdatoer.slice(0, antallBarn);
            } else if (antallBarn && fødselsdatoer.length < antallBarn) {
                newFødselsdatoArray = new Array(antallBarn - fødselsdatoer.length).fill(undefined);
                newFødselsdatoArray.unshift(...fødselsdatoer);
            }
            newFødselsdatoArray = action.bornOnSameDate ? newFødselsdatoArray.fill(fødselsdatoer[0]) : newFødselsdatoArray;
            return { ...state, barn: { ...barn, fødselsdatoer: newFødselsdatoArray }};
        case SoknadActionKeys.SET_TERMINDATO:
            const { termindato } = action;
            return {
                ...state,
                barn: barn ?
                    { ...barn, termindato } : { termindato }
            };
        case SoknadActionKeys.SET_TERMINBEKREFTELSE_DATO:
            const { terminbekreftelseDato } = action;
            return {
                ...state,
                barn: barn ? { ...barn, terminbekreftelseDato } : { terminbekreftelseDato }
            };
        case SoknadActionKeys.SET_ANNEN_FORELDER_NAVN:
            const { navn } = action;
            return { ...state, annenForelder: { ...state.annenForelder, navn } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_FNR:
            const fnr = action.fnr.length > 0 ? action.fnr : undefined;
            return { ...state, annenForelder: { ...state.annenForelder, fnr } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_UTENLANDSK_FNR:
            const { utenlandskFnr } = action;
            return { ...state, annenForelder: { ...state.annenForelder, utenlandskFnr, bostedsland: undefined } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_BOSTEDSLAND:
            const { bostedsland } = action;
            return { ...state, annenForelder: { ...state.annenForelder, bostedsland } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_KAN_IKKE_OPPGIS:
            const { kanIkkeOppgis } = action;
            return { ...state, annenForelder: { kanIkkeOppgis } };
    }
    return state;
};

export default soknadReducer;

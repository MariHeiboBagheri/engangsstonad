import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { soknadActionCreators as soknad } from '../../../../redux/actions';
import { default as Barn, UfodtBarn } from '../../../../types/domain/Barn';
import getMessage from 'util/i18n/i18nUtils';
import { DispatchProps } from '../../../../redux/types/index';
import OmTerminbekreftelsen from 'components/modal-content/OmTerminbekreftelsen';
import {
    erIUke26Pluss3,
    erMindreEnn3UkerSiden,
    getForsteMuligeTerminbekreftesesdato,
    getFørsteMuligeTermindato,
    getSisteMuligeTerminbekreftesesdato,
    getSisteMuligeTermindato,
    idagEllerTidligere,
    utstedtDatoErIUke26
} from 'util/validation/validationUtils';
import LabelText from 'components/labeltext/LabelText';
import ValidDateInput from '../../../../lib/valid-date-input';
import FormBlock from 'components/form-block/FormBlock';
import Terminbekreftelse from './Terminbekreftelse';
import { buildDateObject } from 'util/date/dateUtils';

const Modal = require('nav-frontend-modal').default;

interface StateProps {
    barn: Barn;
    vedlegg: File[];
    vedleggURL: URL;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

interface State {
    isModalOpen: boolean;
}

export default class UfødtBarnPartial extends React.Component<Props, State> {
    componentWillMount() {
        this.setState({...this.state, isModalOpen: false});
    }

    closeTerminbekreftelseModal() {
        this.setState({isModalOpen: false});
    }

    getTermindatoValidators() {
        const {intl} = this.props;
        const barn = this.props.barn as any;
        return [
            {
                test: () => barn.termindato,
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåOppgi')
            },
            {
                test: () => barn.termindato !== '',
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåOppgi')
            },
            {
                test: () => erIUke26Pluss3(barn.termindato),
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåVæreIUke26')
            },
            {
                test: () => erMindreEnn3UkerSiden(barn.termindato),
                failText: getMessage(intl, 'valideringsfeil.termindato.termindatoKanIkkeVære3UkerFraIdag')
            }
        ];
    }

    getTerminbekreftelseDatoValidators() {
        const {intl} = this.props;
        const barn = this.props.barn as any;
        return [
            {
                test: () => barn.terminbekreftelseDato,
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåOppgi')
            },
            {
                test: () => barn.terminbekreftelseDato !== '',
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåOppgi')
            },
            {
                test: () => idagEllerTidligere(barn.terminbekreftelseDato),
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.måVæreIdagEllerTidligere')
            },
            {
                test: () => utstedtDatoErIUke26(barn.terminbekreftelseDato, barn.termindato),
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåVæreIUke26')
            }
        ];
    }

    render() {
        const {vedlegg, vedleggURL, dispatch} = this.props;
        const barn = this.props.barn as UfodtBarn;
        const {antallBarn} = barn;
        const {termindato, terminbekreftelseDato} = barn;

        const datoavgrensningTermindato = {
            minDato: getFørsteMuligeTermindato(),
            maksDato: getSisteMuligeTermindato()
        };

        const datoavgrensningTerminbekreftelse = {
            minDato: getForsteMuligeTerminbekreftesesdato(barn.termindato),
            maksDato: getSisteMuligeTerminbekreftesesdato(barn.termindato)
        };

        return (
            <div>
                {antallBarn && (
                    <FormBlock>
                        <ValidDateInput
                            id="termindato"
                            name="termindato"
                            dato={buildDateObject(termindato)}
                            label={<LabelText intlId="relasjonBarn.text.termindato"/>}
                            onChange={(dato: Date) => dato && dispatch(soknad.setTermindato(dato ? dato.toISOString() : ''))}
                            onInputChange={(dato: string) => dato && dispatch(soknad.setTermindato(dato))}
                            validators={this.getTermindatoValidators()}
                            avgrensninger={datoavgrensningTermindato}
                        />
                    </FormBlock>
                )}

                <FormBlock visible={barn.termindato !== undefined}>
                    <Terminbekreftelse
                        vedlegg={vedlegg}
                        vedleggURL={vedleggURL}
                        onFilesSelect={files => dispatch(soknad.addVedlegg(files))}
                        onFileDelete={file => dispatch(soknad.deleteVedlegg(file))}
                        onFileSave={file => dispatch(soknad.saveVedlegg(file))}

                    />
                </FormBlock>

                <FormBlock visible={vedlegg.length > 0 && barn.termindato !== undefined}>
                    <div key="dateInputTerminBekreftelse">
                        <ValidDateInput
                            id="terminbekreftelse"
                            name="terminbekreftelse"
                            dato={buildDateObject(terminbekreftelseDato)}
                            label={<LabelText intlId="relasjonBarn.text.datoTerminbekreftelse"/>}
                            onChange={(dato: Date) => dato && dispatch(soknad.setTerminbekreftelseDato(dato ? dato.toISOString() : ''))}
                            onInputChange={(dato: string) => dato && dispatch(soknad.setTerminbekreftelseDato(dato))}
                            validators={this.getTerminbekreftelseDatoValidators()}
                            avgrensninger={datoavgrensningTerminbekreftelse}
                        />
                    </div>
                </FormBlock>
                <Modal
                    isOpen={this.state.isModalOpen}
                    closeButton={true}
                    onRequestClose={() => this.closeTerminbekreftelseModal()}
                    contentLabel="Om terminbekreftelsen"
                >
                    <OmTerminbekreftelsen/>
                </Modal>
            </div>
        );
    }
}

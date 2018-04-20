import * as React from 'react';
const { Knapp } = require('nav-frontend-knapper');
import CountryModal from 'components/country-picker/CountryModal';
import { CountryList } from 'components/country-picker/CountryList';
import { Periode } from '../../types/domain/Utenlandsopphold';
import './countryPicker.less';
import LabelText from 'components/labeltext/LabelText';
import { Tidsperiode } from 'nav-datovelger';
import { Feil } from 'components/skjema-input-element/types';

interface Validators {
    validateLand: (data: any) => Feil | undefined;
    validateFom: (data: any) => Feil | undefined;
    validateTom: (data: any) => Feil | undefined;
}

interface Props {
    label: string;
    language: string;
    utenlandsoppholdListe: Periode[];
    tidsperiode?: Tidsperiode;
    addVisit: (periode: Periode) => void;
    deleteVisit: (periode: Periode) => void;
    editVisit: (periode: Periode, index: number) => void;
    validators?: Validators;
}

interface State {
    isOpen: boolean;
    editVisit?: Periode;
}

class CountryPicker extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const state: State = {
            isOpen: false
        };
        this.state = { ...state };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addVisit = this.addVisit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    closeModal() {
        this.setState({ isOpen: false, editVisit: undefined });
    }

    addVisit(periode: Periode) {
        this.props.addVisit(periode);
        this.setState({ isOpen: false });
    }

    onEditClick(periode: Periode) {
        this.setState({ editVisit: periode, isOpen: true });
    }

    onDeleteClick(periode: Periode) {
        this.props.deleteVisit(periode);
    }

    onModalSubmit(periode: Periode) {
        const { editVisit } = this.state;
        if (editVisit === undefined) {
            this.props.addVisit(periode);
        } else {
            const updatedVisitIndex = this.props.utenlandsoppholdListe.indexOf(editVisit);
            this.props.editVisit(periode, updatedVisitIndex);
        }
        this.setState({ isOpen: false, editVisit: undefined });
    }

    render() {
        const { validators } = this.props;
        return (
            <div>
                {this.props.label && (
                    <div className="blokk-xxs">
                        <LabelText>{this.props.label}</LabelText>
                    </div>
                )}
                <CountryList
                    utenlandsoppholdListe={this.props.utenlandsoppholdListe}
                    onEditClick={(periode: Periode) => this.onEditClick(periode)}
                    onDeleteClick={(periode: Periode) => this.onDeleteClick(periode)}
                />
                {this.state.isOpen && (
                    <CountryModal
                        utenlandsopphold={this.state.editVisit}
                        onSubmit={(periode: Periode) => this.onModalSubmit(periode)}
                        closeModal={() => this.closeModal()}
                        language={this.props.language}
                        label={this.props.label}
                        tidsperiode={this.props.tidsperiode}
                        {...validators}
                    />
                )}
                <Knapp className="countryPicker__addButton" onClick={() => this.openModal()} htmlType="button">
                    Legg til land
                </Knapp>
            </div>
        );
    }
}
export default CountryPicker;

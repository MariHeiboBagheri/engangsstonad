import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'util/i18n/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import AnnenForelder from 'app/types/domain/AnnenForelder';
const { Element } = require('nav-frontend-typografi');

import '../../styles/engangsstonad.less';
import SummaryBlock from 'components/summary-block/SummaryBlock';

interface Props {
    annenForelder: AnnenForelder;
}

const AndreForeldrenOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = props => {
    const { intl } = props;
    const { navn, fnr, utenlandskFnr, bostedsland, kanIkkeOppgis } = props.annenForelder;

    const fnrLabel = utenlandskFnr ? getMessage(intl, 'oppsummering.text.utenlandskfødselsnummer') : getMessage(intl, 'oppsummering.text.fødselsnummer');
    const fnrText = fnr ? fnr : 'som ikke er oppgitt';

    return (
        <SummaryBlock title={getMessage(intl, 'annenForelder.sectionheading')}>
            {kanIkkeOppgis && <Element>{getMessage(intl, 'annenForelder.label.kanIkkeOppgiNavn')}</Element>}
            {!kanIkkeOppgis && navn && <DisplayTextWithLabel key="annenForelderNavn" label={getMessage(intl, 'annenForelder.label.navn')} text={navn} />}
            {(fnr || utenlandskFnr) && <DisplayTextWithLabel key="annenForelderFødselsnummer" label={fnrLabel} text={fnrText} />}
            {utenlandskFnr &&
                bostedsland && <DisplayTextWithLabel label={getMessage(intl, 'annenForelder.label.bostedsland')} text={countries.getName(bostedsland, 'nb')} />}
        </SummaryBlock>
    );
};
export default injectIntl(AndreForeldrenOppsummering);

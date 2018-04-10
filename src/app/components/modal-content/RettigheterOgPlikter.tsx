import * as React from 'react';
const { FormattedMessage, injectIntl } = require('react-intl');
const { Undertittel, Normaltekst } = require('nav-frontend-typografi');
import getMessage from '../../util/i18n/i18nUtils';
import Lenke from 'nav-frontend-lenker';

import './modalContent.less';
import InjectedIntl = ReactIntl.InjectedIntl;

interface Props {
    intl: InjectedIntl;
}

const RettigheterOgPlikter: React.StatelessComponent<Props> = ({ intl }) => (
    <div className="modalContent">
        <Undertittel className="modalContent__header">{getMessage(intl, 'rettigheter.sectionheading')}</Undertittel>
        <ul>
            <li>
                <Normaltekst>{getMessage(intl, 'rettigheter.text.uretteOpplysninger')}</Normaltekst>
            </li>
            <li>
                <Normaltekst>
                    <FormattedMessage
                        id="rettigheter.text.lestOgForstått"
                        values={{
                            link: (
                                <Lenke href="https://nav.no/rettOgPlikt" target="_blank">
                                    <FormattedMessage id="rettigheter.text.lestOgForstått.link" />
                                </Lenke>
                            )
                        }}
                    />
                </Normaltekst>
            </li>
            <li>
                <Normaltekst>{getMessage(intl, 'rettigheter.text.innhenteOpplysninger')}</Normaltekst>
                <ul className="modalContent__sublist">
                    <li>
                        <Normaltekst>{getMessage(intl, 'rettigheter.text.innhenteOpplysninger.1')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'rettigheter.text.innhenteOpplysninger.2')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'rettigheter.text.innhenteOpplysninger.3')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'rettigheter.text.innhenteOpplysninger.4')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'rettigheter.text.innhenteOpplysninger.5')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'rettigheter.text.innhenteOpplysninger.6')}</Normaltekst>
                    </li>
                </ul>
            </li>
            <li>
                <Normaltekst>
                    <FormattedMessage
                        id="rettigheter.text.personvernerklering"
                        values={{
                            link: (
                                <Lenke
                                    href={
                                        'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/' +
                                        'Teknisk+brukerstotte/Snarveier/' +
                                        'personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten'
                                    }
                                    target="_blank"
                                >
                                    <FormattedMessage id="rettigheter.text.personvernerklering.link" />
                                </Lenke>
                            )
                        }}
                    />
                </Normaltekst>
            </li>
        </ul>
    </div>
);

export default injectIntl(RettigheterOgPlikter);

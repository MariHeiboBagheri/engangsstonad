import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface Props {
    tittel?: string;
    children: React.ReactNode;
}

const EngangsstønadSteg: React.StatelessComponent<Props & InjectedIntlProps> = ({ tittel, children, intl }) => {
    let dokumenttittel = intl.formatMessage({
        id: 'intro.standard.dokumenttittel'
    });
    if (tittel) {
        dokumenttittel = `${dokumenttittel} - ${tittel}`;
    }

    return (
        <div className="engangsstonad__step">
            <DocumentTitle title={dokumenttittel} />
            {children}
        </div>
    );
};

export default injectIntl(EngangsstønadSteg);

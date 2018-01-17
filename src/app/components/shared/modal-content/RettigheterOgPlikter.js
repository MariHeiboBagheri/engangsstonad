import React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import './modalContent.less';

const RettigheterOgPlikter = () => (
	<div className="simpleModal">
		<Undertittel className="simpleModal__header">
			<FormattedMessage id="intro.pageheading.samtykke" />
		</Undertittel>
		<ul>
			<li>
				<Normaltekst>
					Jeg forstår at når jeg søker engangsstønad kan jeg ikke få
					foreldrepenger for det samme barnet.
				</Normaltekst>
			</li>
			<li>
				<Normaltekst>
					Jeg samtykker til at NAV kan innhente opplysninger som er nødvendig
					for å behandle søknaden min.
				</Normaltekst>
				<ul>
					<li>
						<Normaltekst>arbeidsforhold</Normaltekst>
					</li>
					<li>
						<Normaltekst>inntekt</Normaltekst>
					</li>
					<li>
						<Normaltekst>tillknytning til norge</Normaltekst>
					</li>
					<li>
						<Normaltekst>opplysninger om barnet</Normaltekst>
					</li>
					<li>
						<Normaltekst>opplysninger om den andre forelderen</Normaltekst>
					</li>
				</ul>
			</li>
			<li>
				<Normaltekst>
					Jeg forstår at hvis jeg gir uriktige opplysninger kan det få
					konsekvenser for retten til engangsstønaden.
				</Normaltekst>
			</li>
			<li>
				<Normaltekst>Jeg har lest og forstått det som står på</Normaltekst>
			</li>
		</ul>
	</div>
);

export default RettigheterOgPlikter;

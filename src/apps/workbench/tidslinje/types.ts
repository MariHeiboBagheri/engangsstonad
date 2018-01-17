export type Hendelsestype = 'start' | 'uttak' | 'termin' | 'fødsel' | 'slutt';
export type Forelder = 'mor' | 'medforelder';

export interface Hendelse {
	dato: Date;
	delhendelser: Delhendelse[];
	type: Hendelsestype;
}

export interface Delhendelse {
	navn: string;
	beskrivelse?: string;
	ekstrainfo?: string;
	forelder?: Forelder;
	gradert?: boolean;
}

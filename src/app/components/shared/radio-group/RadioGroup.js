// @flow
import React from 'react';

import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';

import './radioGroup.less';

type Props = {
    listOfRadioData: Object,
    name: string
}

const RadioGroup = (props: Props) => (
    <SkjemaGruppe className="radioGroup">
        {props.listOfRadioData.map((radioData) => (
            <Radio
                className="radioGroup__radioButton"
                key={radioData.value}
                name={props.name}
                {...radioData}
            />
        ))}
    </SkjemaGruppe>
);

export default RadioGroup;
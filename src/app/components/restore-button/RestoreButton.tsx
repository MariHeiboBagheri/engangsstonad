import * as React from 'react';

const {Knapp} = require('nav-frontend-knapper');

interface Props {
    onClick: () => void;
}

const RestoreButton: React.StatelessComponent<Props> = ({onClick}) => {
    return (
        <Knapp onClick={onClick} mini={true} htmlType="button">
            Hent!
        </Knapp>
    );

};

export default RestoreButton;

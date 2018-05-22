import * as React from 'react';

const {Knapp} = require('nav-frontend-knapper');

interface Props {
    onClick: () => void;
}

const SaveButton: React.StatelessComponent<Props> = ({onClick}) => {
    return (
        <Knapp onClick={onClick} mini={true} htmlType="button">
            Kladd!
        </Knapp>
    );

};

export default SaveButton;

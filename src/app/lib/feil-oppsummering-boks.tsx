import * as React from 'react';
import classNames from 'classnames';
import { Systemtittel } from 'nav-frontend-typografi';
import './validering-style.less';

export interface Error {
    name: string;
    text: string;
}
interface Props {
    title: string;
    show: boolean;
    className?: string;
    errors: Error[];
}

const cls = (show: boolean, className?: string) =>
    classNames('feil-oppsummering-boks', className, {
        'feil-oppsummering-boks--visible': show
    });

class FeilOppsummeringBoks extends React.Component<Props, {}> {
    element: HTMLElement | null;
    componentDidMount() {
        if (this.element) {
            this.element.focus();
        }
    }
    render() {
        const { className, show, errors, title, ...other } = this.props;

        const listItems = errors.map(error => {
            const link = '#' + error.name;
            return (
                <li key={error.name}>
                    <a className="feil-oppsummering-boks__lenke" href={link}>
                        {error.text}
                    </a>
                </li>
            );
        });

        return (
            <article
                ref={node => {
                    this.element = node;
                }}
                tabIndex={-1}
                className={cls(show, className)}
                {...other}
            >
                <Systemtittel>{title}</Systemtittel>
                <ul className="feil-oppsummering-boks__liste">{listItems}</ul>
            </article>
        );
    }
}

export default FeilOppsummeringBoks;

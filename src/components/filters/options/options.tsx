import React, { Component, ReactNode } from 'react';
import classes from './options.module.css';

interface MyFacilityProps {
    options: Array<ReactNode>;
    handler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
}

export default class Options extends Component<MyFacilityProps> {

    public render(): JSX.Element {
        const handleClick: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.handler(e);
        return (
            <>
                <label className={classes.label}>search by {this.props.label}</label>

                <select
                    className={classes.all}
                    onChange={handleClick}
                >
                    <option value="" />
                    {this.props.options}
                </select>
            </>

        );
    }
}
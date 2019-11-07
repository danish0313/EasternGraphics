import React, { Component } from 'react';
import classes from './level.module.css';
import _ from 'lodash';

interface MyProps {
    uniqueLevels: Array<string>;
    levelHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disablingLevel: () => {};
    facilityValue: string;
}

export default class Level extends Component<MyProps> {
    public render(): JSX.Element {
        const handleClick: React.ChangeEventHandler  = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.levelHandler(e);
        return (
            <>
                {this.props.facilityValue.length ? (
                    <>
                        <label className={classes.label}>search by Level</label>

                        <select
                            className={classes.all}
                            onChange={handleClick}
                        >
                            <option value="" />
                            {this.props.uniqueLevels.map(
                                (level: string, i: number) => {
                                    return (
                                        <option
                                            key={level + i}
                                            disabled={
                                                _.indexOf(this.props.uniqueLevels, level) !==
                                                this.props.disablingLevel()
                                            }
                                            selected={
                                                _.indexOf(this.props.uniqueLevels, level) ===
                                                this.props.disablingLevel()
                                            }
                                            value={level}
                                        >
                                            {''}
                                            {level}
                                        </option>
                                    );
                                }
                            )}
                        </select>
                    </>
                ) : (
                        <>
                            <label className={classes.label}>search by Level</label>

                            <select
                                className={classes.all}
                                onChange={handleClick}
                            >
                                <option value="" />
                                {this.props.uniqueLevels.map(
                                    (level: string, i: number) => {
                                        return (
                                            <option key={level + i} value={level}>
                                                {''}
                                                {level}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </>
                    )}
            </>
        );
    }
}
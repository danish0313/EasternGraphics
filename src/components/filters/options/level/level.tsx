import React, { Component } from 'react';
import classes from './level.module.css';
import _ from 'lodash';

interface MyLevelProps {
    uniqueLevels: Array<string>;
    levelHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disablingLevel: () => {};
    facilityValue: string;
    labelForLevel: string;
}

export default class Level extends Component<MyLevelProps> {
    public render(): JSX.Element {
        const handleClick: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.levelHandler(e);
        return (
            <>
                <label className={classes.label}>search by {this.props.labelForLevel}</label>
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
                                    value={level}
                                    disabled={this.props.facilityValue ?
                                        _.indexOf(this.props.uniqueLevels, level) !==
                                        this.props.disablingLevel() : false
                                    }
                                    selected={
                                        _.indexOf(this.props.uniqueLevels, level) ===
                                        this.props.disablingLevel()
                                    }

                                >
                                    {''}
                                    {level}
                                </option>
                            );
                        }
                    )}
                </select>
            </>
        );
    }
}
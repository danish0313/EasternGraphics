import React, { Component } from 'react';
import classes from './facility.module.css';
import _ from 'lodash';

interface MyProps {
    uniqueFacilities: Array<string>;
    FacilitiesHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disablingFacility: () => {};
    levelValue: string;
}

export default class Facility extends Component<MyProps> {

    public render(): JSX.Element {
        const handleClick: React.ChangeEventHandler  = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.FacilitiesHandler(e);
        return (
            <>
                {this.props.levelValue.length ? (
                    <>
                        <label className={classes.label}>search by facility</label>

                        <select
                            className={classes.all}
                            onChange={handleClick}
                        >
                            <option value="" />
                            {this.props.uniqueFacilities.map(
                                (facilities: string, i: number) => {
                                    return (
                                        <option
                                            key={facilities + i}
                                            disabled={
                                                _.indexOf(this.props.uniqueFacilities, facilities) !==
                                                this.props.disablingFacility()
                                            }
                                            selected={
                                                _.indexOf(this.props.uniqueFacilities, facilities) ===
                                                this.props.disablingFacility()
                                            }
                                            value={facilities}
                                        >
                                            {''}
                                            {facilities}
                                        </option>
                                    );
                                }
                            )}
                        </select>
                    </>
                ) : (
                        <>
                            <label className={classes.label}>search by facility</label>

                            <select
                                className={classes.all}
                                onChange={handleClick}
                            >
                                <option value="" />
                                {this.props.uniqueFacilities.map(
                                    (facilities: string, i: number) => {
                                        return (
                                            <option key={facilities + i} value={facilities}>
                                                {''}
                                                {facilities}
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
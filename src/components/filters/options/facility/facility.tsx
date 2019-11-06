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
        return (
            <>
                {this.props.levelValue.length ? (
                    <>
                        <label className={classes.label}>search by facility</label>

                        <select
                            className={classes.all}
                            onChange={(e) => {
                                return this.props.FacilitiesHandler(e);
                            }}
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
                                onChange={(e) => this.props.FacilitiesHandler(e)}
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
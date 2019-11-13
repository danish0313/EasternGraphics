import React, { Component } from 'react';
import classes from './facility.module.css';
import _ from 'lodash';

interface MyFacilityProps {
    uniqueFacilities: Array<string>;
    FacilitiesHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disablingFacility: () => {};
    levelValue: string;
    label: string;
}

export default class Facility extends Component<MyFacilityProps> {

    public render(): JSX.Element {
        const handleClick: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.FacilitiesHandler(e);
        return (
            <>
    <label className={classes.label}>search by {this.props.label}</label>

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
                                    value={facilities}
                                    disabled={this.props.levelValue ?
                                        _.indexOf(this.props.uniqueFacilities, facilities) !==
                                        this.props.disablingFacility() : false
                                    }
                                    selected={
                                        _.indexOf(this.props.uniqueFacilities, facilities) ===
                                        this.props.disablingFacility()
                                    }

                                >
                                    {''}
                                    {facilities}
                                </option>
                            );
                        }
                    )}
                </select>
            </>

        );
    }
}
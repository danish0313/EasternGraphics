import React, { Component } from 'react';
import classes from './filters.module.css';
import FilterData from './filterData/filterData';
import Results from './res/res';
import Options from './options/options';
import SearchBar from './options/searchBar/searchBar';
import { Values } from '../../App';
import _ from 'lodash';

interface MyFiltersState {
    facilityValue: string;
    levelValue: string;
    searchValue: string;
}

interface MyFiltersProps {
    results: Array<Values>;
    uniqueFacilities: Array<string>;
    uniqueLevels: Array<string>;

}

export default class Filters extends Component<MyFiltersProps, MyFiltersState> {
    constructor(props: MyFiltersProps) {
        super(props);
        this.state = {
            facilityValue: '',
            levelValue: '',
            searchValue: '',
        };
    }

    public render(): JSX.Element {
        return (
            <>
                <div className={classes.box}>
                    <h1> Error-LOG SEARCH !</h1>
                    <div><Options
                        label="Facility"
                        options={this.props.uniqueFacilities.map(
                            (options: string, i: number) => {
                                return (
                                    <option
                                        key={options + i}
                                        value={options}
                                        selected={
                                            _.indexOf(this.props.uniqueFacilities, options) ===
                                            this.disablingFacility()
                                        }
                                        disabled={this.state.levelValue ?
                                            _.indexOf(this.props.uniqueFacilities, options) !==
                                            this.disablingFacility() : false
                                        }
                                    >
                                        {''}
                                        {options}
                                    </option>
                                );
                            }
                        )}
                        handler={this.filterFacilitiesHandler}

                    />
                        <Options
                            label="Level"
                            options={this.props.uniqueLevels.map(
                                (options: string, i: number) => {
                                    return (
                                        <option
                                            key={options + i}
                                            value={options}
                                            selected={
                                                _.indexOf(this.props.uniqueLevels, options) ===
                                                this.disablingLevel()
                                            }
                                            disabled={this.state.facilityValue ?
                                                _.indexOf(this.props.uniqueLevels, options) !==
                                                this.disablingLevel() : false
                                            }
                                        >
                                            {''}
                                            {options}
                                        </option>
                                    );
                                }
                            )}
                            handler={this.filterLevelHandler}
                        />
                        <br />
                        <SearchBar searchHandler={this.filterSearchHandler} />
                    </div>
                </div>
                <div className={classes.results}>{this.showingResults()}</div>
            </>
        );
    }

    private filterFacilitiesHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value: string = (e.target as HTMLSelectElement).value;

        this.setState({
            facilityValue: value
        });
    };

    private filterLevelHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value: string = (e.target as HTMLSelectElement).value;

        this.setState({
            levelValue: value
        });
    };
    private filterSearchHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const value: string = (e.target as HTMLInputElement).value;

        this.setState({
            searchValue: value
        });
    };

    private searchBasedOnFacility = (array: Array<Values>, facility: string): Array<Values> => {
        if (facility) {
            return array.filter(
                (fac: Values): boolean => fac.facility === facility
            );
        }
        return array;
    };

    private searchBasedOnLevel = (array: Array<Values>, level: string): Array<Values> => {
        if (level) {
            return array.filter(
                (lev: Values): boolean => lev.level === level
            );
        }
        return array;
    };

    private searchBasedOnMessages = (array: Array<Values>, input: string): Array<Values> => {
        if (input) {
            return array.filter(
                (search: Values): boolean =>
                    search.message
                        .toLocaleLowerCase()
                        .includes(input.toLocaleLowerCase())
            );
        }
        return array;
    };

    // Search Filter

    private SearchFilter = (): Array<Values> => {
        // filter the messages based on user inputs
        let res: Array<Values> = this.props.results;

        res = this.searchBasedOnFacility(res, this.state.facilityValue);
        res = this.searchBasedOnLevel(res, this.state.levelValue);
        res = this.searchBasedOnMessages(res, this.state.searchValue);

        return res;
    };

    // Mapping the entire array for displaying on the UI

    private showingResults = () => {
        if (
            this.state.facilityValue.length > 0 ||
            this.state.levelValue.length > 0 ||
            this.state.searchValue.length > 0
        ) {
            return (
                <FilterData

                    searchFilter={this.SearchFilter}
                />
            );
        }

        return <Results results={this.props.results} />;

    };

    private disablingLevel = (): number => {
        return _.indexOf(this.props.uniqueFacilities, this.state.facilityValue);
    };

    private disablingFacility = (): number => {
        return _.indexOf(this.props.uniqueLevels, this.state.levelValue);
    };
}
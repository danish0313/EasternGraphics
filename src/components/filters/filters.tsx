import React, { Component } from 'react';
import classes from './filters.module.css';
import FilterData from './filterData/filterData';
import Results from './res/res';
import Facility from './options/facility/facility';
import Level from './options/level/level';
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
                    <div>
                        <Facility
                            labelForFacility="Facility"
                            uniqueFacilities={this.props.uniqueFacilities}
                            FacilitiesHandler={this.filterFacilitiesHandler}
                            disablingFacility={this.disablingFacility}
                            levelValue={this.state.levelValue}
                        />
                        <Level
                            labelForLevel="Level"
                            uniqueLevels={this.props.uniqueLevels}
                            levelHandler={this.filterLevelHandler}
                            disablingLevel={this.disablingLevel}
                            facilityValue={this.state.facilityValue}
                        /> <br />
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

    private searchBasedOnFacility = (array: Array<Values>, input: string, facility: string): Array<Values> => {
        return array.filter(
            (fac: Values): boolean => fac.facility === facility
        ).filter(
            (search: Values): boolean =>
                search.message
                    .toLocaleLowerCase()
                    .includes(input.toLocaleLowerCase())
        );
    };

    private searchBasedOnLevel = (array: Array<Values>, input: string, level: string): Array<Values> => {

        return array.filter(
            (lev: Values): boolean => lev.level === level
        ).filter(
            (search: Values): boolean =>
                search.message
                    .toLocaleLowerCase()
                    .includes(input.toLocaleLowerCase())
        );

    };

    private searchBasedOnMessages = (array: Array<Values>, input: string): Array<Values> => {

        return array.filter(
            (search: Values): boolean =>
                search.message
                    .toLocaleLowerCase()
                    .includes(input.toLocaleLowerCase())
        );
    };

    // Search Filter

    private SearchFilter = (): Array<Values> => {

        // filter the messages based on user inputs
        if (this.state.facilityValue.length > 0) {

            return this.searchBasedOnFacility(this.props.results, this.state.searchValue, this.state.facilityValue);
        }
        if (this.state.levelValue.length > 0) {

            return this.searchBasedOnLevel(this.props.results, this.state.searchValue, this.state.levelValue);
        }
        return this.searchBasedOnMessages(this.props.results, this.state.searchValue);
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
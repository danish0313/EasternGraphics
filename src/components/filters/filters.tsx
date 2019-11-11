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

    private FacilityLevelFilter = (): Array<Values> | undefined => {
        if (this.state.facilityValue.length > 0) {

            return this.props.results.filter(
                (fac: Values): boolean => fac.facility === this.state.facilityValue
            );
        }
        if (this.state.levelValue.length > 0) {

            return this.props.results.filter(
                (lev: Values): boolean => lev.level === this.state.levelValue
            );
        }
    };

    private filterSearchHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const value: string = (e.target as HTMLInputElement).value;

        this.setState({
            searchValue: value
        });
    };

    private SearchBasedOnFacilityLevel = (): Array<Values> => {
        const filteringData: Array<Values> = this.state.facilityValue ? this.props.results.filter(
            (fac: Values): boolean => fac.facility === this.state.facilityValue
        ) : this.props.results.filter(
            (lev: Values): boolean => lev.level === this.state.levelValue
        );

        return filteringData.filter((search: Values): boolean =>
            search.message
                .toLocaleLowerCase()
                .indexOf(this.state.searchValue.toLocaleLowerCase()) >= 0 ||
            search.level
                .toLocaleLowerCase()
                .indexOf(this.state.searchValue.toLocaleLowerCase()) >= 0 ||
            search.facility
                .toLocaleLowerCase()
                .indexOf(this.state.searchValue.toLocaleLowerCase()) >= 0
        );
    };

    private SearchBasedOnUserInput = (): Array<Values> => {
        return this.props.results.filter(

            (search: Values): boolean =>
                search.message
                    .toLocaleLowerCase()
                    .indexOf(this.state.searchValue.toLocaleLowerCase()) >= 0 ||
                search.level
                    .toLocaleLowerCase()
                    .indexOf(this.state.searchValue.toLocaleLowerCase()) >= 0 ||
                search.facility
                    .toLocaleLowerCase()
                    .indexOf(this.state.searchValue.toLocaleLowerCase()) >= 0
        );
    };

    // Search Filter

    private SearchFilter = (): object | undefined => {

        // filter the messages based on user inputs
        if (_.indexOf(this.props.uniqueFacilities, this.state.facilityValue) === this.disablingLevel() ||
            _.indexOf(this.props.uniqueLevels, this.state.levelValue) === this.disablingFacility()) {

            return this.state.facilityValue || this.state.levelValue ? this.SearchBasedOnFacilityLevel() : this.SearchBasedOnUserInput();

        }

    };

    // Mapping the entire array for displaying on the UI

    private ShowingResults = () => {
        if (
            this.state.facilityValue.length > 0 ||
            this.state.levelValue.length > 0 ||
            this.state.searchValue.length > 0
        ) {
            return (
                <FilterData
                    FacilityLevelFilter={this.FacilityLevelFilter}
                    SearchValue={this.state.searchValue}
                    SearchFilter={this.SearchFilter}
                />
            );
        }
        if (
            this.state.facilityValue === '' ||
            this.state.levelValue === '' ||
            this.state.searchValue === ''
        ) {
            return <Results results={this.props.results} />;
        }
    };

    private disablingLevel = (): number => {
        return _.indexOf(this.props.uniqueFacilities, this.state.facilityValue);
    };

    private disablingFacility = (): number => {
        return _.indexOf(this.props.uniqueLevels, this.state.levelValue);
    };

    public render(): JSX.Element {
        return (
            <>
                <div className={classes.box}>
                    <h1> Error-LOG SEARCH !</h1>
                    <div>
                        <Facility
                            uniqueFacilities={this.props.uniqueFacilities}
                            FacilitiesHandler={this.filterFacilitiesHandler}
                            disablingFacility={this.disablingFacility}
                            levelValue={this.state.levelValue}
                        />
                        <Level
                            uniqueLevels={this.props.uniqueLevels}
                            levelHandler={this.filterLevelHandler}
                            disablingLevel={this.disablingLevel}
                            facilityValue={this.state.facilityValue}
                        /> <br />
                        <SearchBar searchHandler={this.filterSearchHandler} />
                    </div>
                </div>
                <div className={classes.results}>{this.ShowingResults()}</div>
            </>
        );
    }
}
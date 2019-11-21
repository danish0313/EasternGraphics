import React, { Component } from 'react';
import classes from './filters.module.css';
import FilterData from './filterData/filterData';
import Results from './res/res';
import Options from './options/options';
import SearchBar from './options/searchBar/searchBar';
import { Values } from '../../App';
interface MyFiltersState {
    facilityValue: string;
    levelValue: string;
    searchValue: string;
    facilityOption: Array<string>;
    levelOption: Array<string>;
    error: boolean;
}

interface MyFiltersProps {
    results: Array<Values>;
}

export default class Filters extends Component<MyFiltersProps, MyFiltersState> {
    constructor(props: MyFiltersProps) {
        super(props);
        this.state = {
            facilityOption: [],
            levelOption: [],
            facilityValue: '',
            levelValue: '',
            searchValue: '',
            error: false

        };
    }

    public render(): JSX.Element {
        return (
            <>
                <div className={classes.box}>
                    <h1> Error-LOG SEARCH !</h1>
                    <div className="ms-Grid" dir="1tr">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg6" >
                                <Options
                                    label="Search By Facility"
                                    options={this.state.facilityOption}
                                    handler={this.filterFacilitiesHandler}

                                />
                            </div>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg6" >
                                <Options
                                    label=" Search By Level"
                                    options={this.state.levelOption}
                                    handler={this.filterLevelHandler}
                                />
                                <br />
                            </div>
                        </div>

                    </div>
                    <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                                <SearchBar label="Search Your Content!" searchHandler={this.filterSearchHandler} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.results}>{this.showingResults()}</div>

            </>
        );
    }
    public componentDidMount = async () => {
        await this.FilterOptionApi();
    };

    private filterFacilitiesHandler = (value: string) => {
        this.setState({
            facilityValue: value
        });
    };

    private filterLevelHandler = (value: string) => {
        this.setState({
            levelValue: value
        });
    };
    private filterSearchHandler = (value: string) => {
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
                    search.content
                        .toLocaleLowerCase()
                        .includes(input.toLocaleLowerCase())
            );
        }
        return array;
    };

    // Search Filter

    private SearchFilter = (): Array<Values> => {
        // filter the messages based on user inputs
        let results: Array<Values> = this.props.results;

        results = this.searchBasedOnFacility(results, this.state.facilityValue);
        results = this.searchBasedOnLevel(results, this.state.levelValue);
        results = this.searchBasedOnMessages(results, this.state.searchValue);

        return results;
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

    // API call for fetching Facility and Level Options
    private FilterOptionApi = async () => {
        try {

            const repl: Response = await fetch('http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/filter');
            const filterOptions: any = await repl.json();
            const facility: Array<string> = filterOptions.filters.facility;
            const level: Array<string> = filterOptions.filters.level;
            facility.unshift('');
            level.unshift('');
            this.setState(
                {
                    facilityOption: facility,
                    levelOption: level
                },
            );

        } catch {

            this.setState(
                {
                    error: true
                });
        }
    };

}
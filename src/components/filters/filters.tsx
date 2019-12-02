import React, { Component } from 'react';
import classes from './filters.module.css';
import FilterData from './filterData/filterData';
import Options from './options/options';
import SearchBar from './options/searchBar/searchBar';
import { Values, Results } from '../../App';
import _ from 'lodash';
interface MyFiltersState {
    facilityValue: string;
    levelValue: string;
    searchValue: string;
    facilityOption: Array<string>;
    levelOption: Array<string>;
    error: boolean;
    loading: boolean;
    filteredArray: Array<Values>;
}

interface MyFiltersProps {
    results: Array<Values>;
}

interface ApiFilters {
    filters: {
        facility: Array<string>;
        level: Array<string>;
    };

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
            error: false,
            loading: false,
            filteredArray: []
        };
        this.filterSearchHandler = _.debounce(this.filterSearchHandler, 1500);
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
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                            <div className={classes.results}>  <FilterData

                                filteredArray={this.state.filteredArray}
                                results={this.props.results}
                                facilityValue={this.state.facilityValue}
                                levelValue={this.state.levelValue}
                                searchValue={this.state.searchValue}
                                loading={this.state.loading}
                            /></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    public componentDidMount = async () => {
        await this.FilterOptionApi();
    };

    private filterFacilitiesHandler = async (value: string) => {
        this.setState({
            facilityValue: value,
            loading: true
        });

        const response: Response = await fetch(
            'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/search',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // level: "DEBUG",
                    // message: "Session",
                    facility: value || undefined
                })
            });
        const data: Results = await response.json();
        this.setState(
            {
                filteredArray: data.results,
                loading: false
            },
        );
    };

    private filterLevelHandler = async (value: string) => {
        this.setState({
            levelValue: value,
            loading: true
        });
        const response: Response = await fetch(
            'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/search',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    level: value,
                    // message: "Session",
                    // facility: value
                })
            });
        const data: Results = await response.json();
        this.setState(
            {
                filteredArray: data.results,
                loading: false
            },
        );
    };

    private filterSearchHandler = async (value: string) => {
        this.setState({
            searchValue: value
        });

        const response: Response = await fetch(
            'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/search',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    facility: this.state.facilityValue || undefined,
                    level: this.state.levelValue || undefined,
                    message: value
                })
            });
        const data: Results = await response.json();
        this.setState(
            {
                filteredArray: data.results,
                loading: false
            },
        );
    };

    // API call for fetching Facility and Level Options
    private FilterOptionApi = async () => {
        try {

            const repl: Response = await fetch('http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/filter');
            const filterOptions: ApiFilters = await repl.json();
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
import React, { Component } from 'react';
import classes from './filters.module.css';
import FilterData from './filterData/filterData';
import Options from './options/options';
import SearchBar from './options/searchBar/searchBar';
import { Values, Results } from '../../App';
import DatePickerInput from './options/datePicker/datePicker';
import _ from 'lodash';
interface MyFiltersState {
    facilityValue: string;
    levelValue: string;
    searchValue: string;
    dateStartValue: number  | undefined;
    dateEndValue: number | undefined;
    facilityOption: Array<string>;
    levelOption: Array<string>;
    error: boolean;
    loading: boolean;
    filteredArray: Array<Values>;
}

interface MyFiltersProps {
    arrayWithoutFilter: Array<Values>;
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
            dateStartValue: undefined,
            dateEndValue: undefined,
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
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4" >
                                <Options
                                    label="Search By Facility"
                                    options={this.state.facilityOption}
                                    handler={this.optionFilterHandler}

                                />
                            </div>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4" >
                                <Options
                                    label=" Search By Level"
                                    options={this.state.levelOption}
                                    handler={this.optionFilterHandler}
                                />

                            </div>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4" >
                                <DatePickerInput  handler={this.optionFilterHandler} />
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
                                arrayWithoutFilter={this.props.arrayWithoutFilter}
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

    private optionFilterHandler = async (option: string , start?: number , end?: number) => {
        let facility: string = '';
        let level: string = '';
        if (this.state.facilityOption.includes(option)) {
             facility = option;
        } else {
         level  = option;
        }

        this.setState({
            facilityValue: facility,
            levelValue: level,
            dateStartValue: start,
            dateEndValue: end,
            loading: true
        });
        console.log(start , end);

        const response: Response = await fetch(
            'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/search',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    facility: facility || undefined,
                    level: level || undefined,
                    start_date: start || undefined,
                    end_date: end || undefined
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
                    message: value || undefined
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
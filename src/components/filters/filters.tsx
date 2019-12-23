import React, { Component } from 'react';
import classes from './filters.module.css';
import FilterData from './filterData/filterData';
import Options from './options/options';
import SearchBar from './options/searchBar/searchBar';
import { Values, Results } from '../../App';
import DatePickerInput from './options/datePicker/datePicker';
import _ from 'lodash';
interface MyFiltersState {
    option: string;
    key: string | number;
    searchValue: string | undefined;
    dateStartValue: number | Date | undefined | null;
    dateEndValue: number | Date | undefined | null;

    filterOptions: Array<Option>;

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
        host: Array<string>;
    };
}

interface Option {
    values: Array<string>;
    keys: string;
}

export default class Filters extends Component<MyFiltersProps, MyFiltersState> {
    constructor(props: MyFiltersProps) {
        super(props);
        this.state = {
            filterOptions: [],
            option: '',
            key: '',
            searchValue: undefined,
            dateStartValue: undefined,
            dateEndValue: undefined,
            error: false,
            loading: false,
            filteredArray: []
        };
        this.filterHandler = _.debounce(this.filterHandler, 700);
    }
    public render(): JSX.Element {

        return (
            <>
                <div className={classes.box}>
                    <h1> Error-LOG SEARCH !</h1>
                    <div className="ms-Grid" dir="1tr">
                        {this.state.filterOptions.map((options, index) => <div key={index} className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4">

                            <Options
                                options={options.values}
                                handler={this.optionFilterHandler}
                                label={options.keys}
                            />
                        </div>)}
                    </div>
                    <div className="ms-Grid" dir="1tr">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4" >
                                <DatePickerInput handler={this.optionFilterHandler} reset={this.resetDatePicker} />
                            </div>
                        </div>
                    </div> </div>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                            <SearchBar label="Search Your Content!" searchHandler={this.optionFilterHandler} />
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

    private resetDatePicker = (): void => {
        this.setState({ dateStartValue: null, dateEndValue: null }, this.filterHandler);
    };

    private optionFilterHandler = (option: string, key: string | number, value?: string, start?: number | Date, end?: number | Date, ) => {

        if (option || key) {
            this.setState({
                option: option,
                key: key,
                dateStartValue: start == null ? this.state.dateStartValue : start,
                dateEndValue: end == null ? this.state.dateEndValue : end,
                loading: true
            },
                this.filterHandler
            ); // callback function
        }

        if (!option || !key) {
            this.setState({
                searchValue: value,
                dateStartValue: start == null ? this.state.dateStartValue : start,
                dateEndValue: end == null ? this.state.dateEndValue : end,
                loading: true
            },
                this.filterHandler
            ); // callback function
        }
    };
    private filterHandler = async () => {

        const body: string = JSON.stringify({
            [this.state.key]: this.state.option.length > 0 ? this.state.option : undefined,
            message: this.state.searchValue,
            start_date: this.state.dateStartValue,
            end_date: this.state.dateEndValue
        });

        const response: Response = await fetch(
            'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/search',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            });
        const data: Results = await response.json();
        this.setState(
            {
                filteredArray: data.results,
                loading: false
            },
        );
    };

    // API call for fetching Options
    private FilterOptionApi = async () => {
        try {

            const repl: Response = await fetch('http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/filter');
            const filterOptions: ApiFilters = await repl.json();
            const arr: Array<Option> = [];

            for (const [key, value] of Object.entries(filterOptions.filters)) {
                value.unshift('');
                arr.push({
                    values: value,
                    keys: key
                });
            }

            this.setState(
                {
                    filterOptions: arr

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
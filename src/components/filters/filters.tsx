import React, { Component } from 'react';
import classes from './filters.module.css';
import FilterData from './filterData/filterData';
import Options from './options/options';
import SearchBar from './options/searchBar/searchBar';
import { Values, Results } from '../../App';
import DatePickerInput from './options/datePicker/datePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import _ from 'lodash';
interface MyFiltersState {
    facilityValue: string;
    levelValue: string;
    hostValue: string;
    searchValue: string;
    dateStartValue: number | Date | undefined;
    dateEndValue: number | Date | undefined;

    filterOptions: Array<string[]>;
    optionLabels: Array<string>;
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
export default class Filters extends Component<MyFiltersProps, MyFiltersState> {
    constructor(props: MyFiltersProps) {
        super(props);
        this.state = {
            filterOptions: [],
            optionLabels: [],
            facilityValue: '',
            levelValue: '',
            hostValue: '',
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
                        <div className="ms-Grid-row" style={{ marginBottom: '50px' }}>
                            {this.state.optionLabels.map((label, index) => <div key={index} className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4">
                                <Label>{`Search By ${label}`} </Label>
                            </div>)}
                            {this.state.filterOptions.map((options, index) => <div key={index} className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4">
                                <Options
                                    options={options}
                                    handler={this.optionFilterHandler}

                                />
                            </div>)}
                        </div>
                        <div className="ms-Grid" dir="1tr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4" >
                                    <DatePickerInput handler={this.optionFilterHandler} />
                                </div>
                            </div>
                        </div> </div>
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

    private optionFilterHandler = async (option: string, start?: number | Date, end?: number | Date) => {
        let level: string = '';
        let facility: string = '';
        let host: string = '';

        if (this.state.filterOptions[0].includes(option)) {
            level = option;
        } else if (this.state.filterOptions[1].includes(option)) {
            host = option;
        } else {
            facility = option;
        }

        this.setState({
            facilityValue: facility,
            levelValue: level,
            hostValue: host,
            dateStartValue: start,
            loading: true
        });

       // console.log(new Date(Number(start) * 1000).toLocaleString('en-US').split('/').join('-') ,
       // new Date(Number(end) * 1000).toLocaleString('en-US').split('/').join('-'));
       // console.log(new Date(Number(1575443889) * 1000));
      //  console.log(1575443889);
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
                    host: host || undefined,
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
                    host: this.state.hostValue || undefined,
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
            const allOptions: Array<string[]> = Object.values(filterOptions.filters);
            const allLabels: Array<string> = Object.keys(filterOptions.filters);

            for (const values of allOptions) {
                values.unshift('');
            }
            this.setState(
                {
                    filterOptions: allOptions,
                    optionLabels: allLabels
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
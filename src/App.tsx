import React, { Component } from 'react';
import './App.css';
import Filters from './components/filters/filters';
import _ from 'lodash';
interface MyAppState {
    data: Array<Values>;
    results: Array<Values>;
    uniqueFacilities: Array<string>;
    uniqueLevels: Array<string>;
    error: boolean;
}
export interface Values {
    message: string;
    facility: string;
    level: string;
    timeStamp: string;

}
interface Data {
    data: [{
        message: string;
        facility: string;
        level: string;
        timeStamp: string;

    }];

}

//  Message Merging Logic Function
const ArrayMergingHandler: (array: Array<Values>) => Array<Values> = (array: Array<Values>): Array<Values> => {
    const errorLog: Array<Values> = array;
    const results: Array<Values> = [];

    for (let j: number = 0; j < errorLog.length; j++) {
        let index: number = -1;
        for (let i: number = 0; i < results.length; i++) {
            if (
                results[i].facility === errorLog[j].facility &&
                results[i].level === errorLog[j].level &&
                results[i].timeStamp === errorLog[j].timeStamp
            ) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            results[index].message += '\n' + errorLog[j].message;
        } else {
            results.push(errorLog[j]);
        }
    }
    return results;
};

export default class App extends Component<{}, MyAppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            data: [],
            results: [],
            uniqueFacilities: [],
            uniqueLevels: [],
            error: false
        };
    }
    public render(): JSX.Element {
        return (
            <div className="App">
                <Filters results={this.state.results} uniqueFacilities={this.state.uniqueFacilities} uniqueLevels={this.state.uniqueLevels} />
            </div>

        );
    }

    public componentDidMount = async () => {
        await this.errorLogApi();
    };

    // API call function

    private errorLogApi = async () => {
        try {

            const response: Response = await fetch('./errors/errors.json');
            const results: Data = await response.json();
            this.setState(
                {
                    data: results.data
                },
                this.ArrayChangeHandler // callback function
            );

        } catch {
            this.setState(
                {
                    error: true
                });
        }
    };

    // Refracting the api json data

    private ArrayChangeHandler = () => {

        const results: Array<Values> = ArrayMergingHandler(this.state.data);

        // removing duplications from results array using lodash

        const unique: Array<Values> = _.uniqBy(results, (e: Values): string => {
            return e.message || e.timeStamp;
        });

        // getting unique facilities from unique array

        const allFacility: Array<string> = unique.map((facilities: Values): string => {
            return facilities.facility;
        });
        const uniqueFacilities: Array<string> = Array.from(new Set(allFacility));

        // getting unique levels from unique array

        const allLevels: Array<string> = unique.map((levels: Values): string => {
            return levels.level;
        });
        const uniqueLevels: Array<string> = Array.from(new Set(allLevels));

        this.setState({
            results: unique,
            uniqueFacilities: uniqueFacilities,
            uniqueLevels: uniqueLevels
        });
    };
}
import React, { Component } from 'react';
import './App.css';
import Filters from './components/filters/filters';
import Navbar from './components/navbar/navbar';
import graphData from './components/graphData/graphData';
import { Route, Switch } from 'react-router-dom';
interface MyAppState {
    data: Array<Values>;
    error: boolean;
}
export interface Values {
    _count: number;
    content: string;
    date: string;
    level?: string;
    facility?: string;
}
export interface Results {
    results: [{
        _count: number;
        content: string;
        date: string;
        level?: string;
        facility?: string;
    }];
}

export default class App extends Component<{}, MyAppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            data: [],
            error: false
        };
    }
    public render(): JSX.Element {

        const filter: () => JSX.Element = () => (<Filters arrayWithoutFilter={this.state.data} />);
        return (
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact={true} path="/" component={filter} />
                    <Route exact={true} path="/graph" component={graphData} />
                </Switch>
            </div>

        );
    }
    public componentDidMount = async () => {
        await this.errorLogApi();
    };

    // API call function
    private errorLogApi = async () => {
        try {

            const response: Response = await fetch(
                'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/search',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })
                });
            const data: Results = await response.json();
            this.setState(
                {
                    data: data.results
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
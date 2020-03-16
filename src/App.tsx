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
    state?: string;
}
export interface Results {
    total: number;
    results: [{
        _id: string;
        hash: string;
        _count: number;
        content: string;
        date: string;
        level?: string;
        facility?: string;
        state: string;
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
                    <Route  path="/" component={filter} />
                    <Route  path="/graph" component={graphData} />
                </Switch>
            </div>

        );
    }
}
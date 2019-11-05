import React, { Component } from 'react';
import './App.css';
import Filters from './components/filters/filters';
import _ from 'lodash';

interface MyState {
  data: Array<Values>;
  res: Array<Values>;
  uniqueFacilities: Array<string>;
  uniquelevels: Array<string>;
  Error: boolean;
}
interface Values {
  message: string;
  facility: string;
  level: string;
  timeStamp: string;
}

class App extends Component<{}, MyState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      res: [],
      uniqueFacilities: [],
      uniquelevels: [],
      Error: false
    };
  }

  public componentDidMount = () => {
    // fetching the error log from public folder
    fetch('./errors/errors.json').then(async (logs: Response) => {
      if (logs.status !== 200) {
        this.setState({ Error: true });
        return;

      }
      await logs.json().then((data) => {
        this.setState(
          {
            Error: false,
            data: data.data
          },
          this.ArrayChangeHandler
        ); // callback function
      });
    }).catch(() => 'obligatory catch');
  };

  // for refracting the api json data

  public ArrayChangeHandler = () => {
    const errorLog: Array<Values> = this.state.data;
    const results: Array<Values> = [];

    // Loop Through the ErrorLog
    for (const i in errorLog) {
      if (errorLog.hasOwnProperty(i)) {

        // similar indexes returned to be pushed in Results Array
        const index: number = getIndexIfLogExists({ value: errorLog[i], arr: results });

        if (index >= 0) {
          results[index].message += '\n' + errorLog[i].message;
        } else {
          results.push(errorLog[i]);
        }
      }
    }

    // returning only those indexes which has same facility , level  and timeStamp

    function getIndexIfLogExists({ value, arr }: { value: Values; arr: Array<Values>; }): number {
      let index: any = -1;
      for (const i in arr) {
        if (
          arr[i].facility === value.facility &&
          arr[i].level === value.level &&
          arr[i].timeStamp === value.timeStamp
        ) {
          index = i;
          break;
        }
      }
      return index;
    }

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
    const uniquelevels: Array<string> = Array.from(new Set(allLevels));

    // setting the state

    this.setState({
      res: unique,
      uniqueFacilities: uniqueFacilities,
      uniquelevels: uniquelevels
    });
  };

  public render(): JSX.Element {

    return (
      <div className="App">
        <Filters res={this.state.res} uniqueFacilities={this.state.uniqueFacilities} uniquelevels={this.state.uniquelevels} />
      </div>

    );
  }
}

export default App;

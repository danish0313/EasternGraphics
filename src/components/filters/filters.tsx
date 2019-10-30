import React, { Component } from 'react';
import classes from './filters.module.css';
import Filterdata from './filterData/FilterData';
import Results from './res/res';
import Facility from './options/facility/facility';
import Level from './options/level/level';
import Searchbar from './options/searchbar/searchbar';
import _ from 'lodash';
import { number } from 'prop-types';

interface MyState  {
  data: Array<Values>;
  res: Array<Values>;
  facilityValue: any;
  uniqueFacilities: Array<UniqueFacility>;
  uniquelevels: Array<UniqueLevel> ;
  LevelValue: any;
  SearchValue: string;
  Error: boolean;
}

interface Values {
  message: string ;
  facility: string;
  level: string;
  timeStamp: string;
}

interface UniqueFacility {
    facility: string;
}

interface UniqueLevel {
 level: string;
}

export default class Filters extends Component<{}, MyState> {
  constructor(props: {}) {
 super(props);
 this.state = {
      data : [],
      res: [],
      facilityValue: '',
      LevelValue: '',
      SearchValue: '',
      uniqueFacilities: [],
      uniquelevels: [],
      Error: false
};
}

 public componentDidMount =  () => {
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
    const errorLog: Array<Values>   = this.state.data;
    const results: Array<Values> = [];

    // Loop Through the ErrorLog
    for (const i in errorLog) {
      // similar indexes returned to be pushed in Results Array
      const index: number = getIndexIfLogExists({ value: errorLog[i], arr: results });

      if (index >= 0) {
        results[index].message += '\n' + errorLog[i].message;
      } else {
        results.push(errorLog[i]);
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

  const unique: Array<Values>  = _.uniqBy(results, (e: Values): string =>  {
      return e.message || e.timeStamp;
    });

    // getting unique facilities from unique array

    const allFacility: Array<UniqueFacility>  = unique.map((facilities: any ) => {
      return facilities.facility;
    });
    const uniqueFacilities: Array<UniqueFacility> = Array.from(new Set(allFacility));

    // getting unique levels from unique array

    const allLevels: Array<UniqueLevel> = unique.map((levels: any) => {
      return levels.level;
    });
    const uniquelevels: Array<UniqueLevel>  = Array.from(new Set(allLevels));

    // setting the state

    this.setState({
      res: unique,
      uniqueFacilities: uniqueFacilities,
      uniquelevels: uniquelevels
    });
  };

  // Filter handler for facility

  public FacilitiesHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
   const value: string = (e.target as HTMLSelectElement).value;
    // storing the facility value in state

  this.setState({
    facilityValue: value
  });
  };

  // Filter handler for level

 public levelHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = (e.target as HTMLSelectElement).value;
    // storing the level value in state

    this.setState({
    LevelValue: value
  });
  };

 public FacilityLevelFilter = () => {
    if (this.state.facilityValue.length > 0) {
      // getting all the facility from errorLog by mapping

      const facilities: object = this.state.res.filter(
      (fac: Values): boolean => fac.facility === this.state.facilityValue
      );

      return facilities;

    } if (this.state.LevelValue.length > 0) {
      // getting all the levels from errorLog by mapping

     const  levels: object = this.state.res.filter(
      (lev: Values): boolean => lev.level === this.state.LevelValue
      );
      return levels;

  }
  };

  // search Handler
 public SearchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = (e.target as HTMLInputElement).value;
    // storing the search value in to the state

    this.setState({
      SearchValue: value
 });
};

  // Search Filter

 public SearchFilter = () => {

    let search: object = [{}];

    // filter the messages based on user inputs

   if(this.state.SearchValue.length > 0 && this.state.facilityValue.length > 0 ) {
     search  = this.state.res.filter(
   (facilities: Values) => {
         return facilities.facility === this.state.facilityValue;
       }
    ).filter(
      (search: Values): boolean =>
        {
          return search.message.toLocaleLowerCase().indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
            search.level
              .toLocaleLowerCase()
              .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
            search.facility
              .toLocaleLowerCase()
              .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0;
        }
    );
    return search;
    } if( this.state.SearchValue.length > 0 && this.state.LevelValue.length > 0 ) {

      search  = this.state.res.filter(
        (levels: Values) => {
          return levels.level === this.state.LevelValue;
        }
      ).filter(
        (searched: Values): boolean =>
          {
            return searched.message.toLocaleLowerCase().indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
              searched.level
                .toLocaleLowerCase()
                .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
              searched.facility
                .toLocaleLowerCase()
                .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0;
          }
      );
      return search;
    } else {

      search  =this.state.res.filter(
        (search: Values): boolean =>
          {
            return search.message.toLocaleLowerCase().indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
              search.level
                .toLocaleLowerCase()
                .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
              search.facility
                .toLocaleLowerCase()
                .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0;
          }
      );
    return search;
    }
  };

  // Mapping the entire array for displaying on the UI

  public ShowingResults = () => {
    if (
      this.state.facilityValue.length > 0 ||
      this.state.LevelValue.length > 0 ||
      this.state.SearchValue.length > 0
    ) {
      return (
        <Filterdata
          FacilityLevelFilter={this.FacilityLevelFilter}
          SearchValue={this.state.SearchValue}
          SearchFilter={this.SearchFilter}      
        />
      );
  } if (
      this.state.facilityValue === '' ||
      this.state.LevelValue === '' ||
      this.state.SearchValue === ''
    ) {
      return <Results res={this.state.res} />;
    }
};

  // for Facility  Select Options

 public FacilityFilterHandler = (): JSX.Element => {
    return (
      <Facility
        uniquefacilities={this.state.uniqueFacilities}
        FacilitiesHandler={this.FacilitiesHandler}
        disablingfacility={this.disablingfacility}
        levelvalue={this.state.LevelValue}
      />
    );
  };

  // for disabling  options of level

 public disablingOption = (): number => {
    return _.indexOf(this.state.uniqueFacilities, this.state.facilityValue);
  };

  // for disabling  options of facility

 public disablingfacility = (): number => {
    return _.indexOf(this.state.uniquelevels, this.state.LevelValue);
  };

  // for level  Select Options

  public LevelFilterHandler = (): JSX.Element => {
    return (
      <Level
        uniquelevels={this.state.uniquelevels}
        levelHandler={this.levelHandler}
        disablinglevel={this.disablingOption}
        facilityvalue={this.state.facilityValue}
      />
    );
  };
  // search bar for searching messages

 public SearchbarHandler = (): JSX.Element => {
    return <Searchbar searchHandler={this.SearchHandler} />;
  };

public  render(): JSX.Element {
  
    return (
      <>
        <div className={classes.box}>
          <h1> Error-LOG SEARCH !</h1>
          <div>
            {this.FacilityFilterHandler()}
            {this.LevelFilterHandler()} <br />
            {this.SearchbarHandler()}
          </div>
        </div>

        <div className={classes.results}>{this.ShowingResults()}</div>
      </>
    );
  }
}

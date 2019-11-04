import React, { Component } from 'react';
import classes from './filters.module.css';
import Filterdata from './filterData/FilterData';
import Results from './res/res';
import Facility from './options/facility/facility';
import Level from './options/level/level';
import Searchbar from './options/searchbar/searchbar';
import _ from 'lodash';

interface MyState  {
  facilityValue: any;
  LevelValue: any;
  SearchValue: string;
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

interface MyProps  {
  res: Array<Values>;
  uniqueFacilities: Array<UniqueFacility>;
  uniquelevels: Array<UniqueLevel> ;
 
}

export default class Filters extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
 super(props);
 this.state = {
      facilityValue: '',
      LevelValue: '',
      SearchValue: '',
};
}

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

    return this.props.res.filter(
      (fac: Values): boolean => fac.facility === this.state.facilityValue
    );
  }
  if (this.state.LevelValue.length > 0) {
    // getting all the levels from errorLog by mapping

    return this.props.res.filter(
      (lev: Values): boolean => lev.level === this.state.LevelValue
    );
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

  let searchable: object = [{}];

  // filter the messages based on user inputs

  if (this.state.SearchValue.length > 0 && this.state.facilityValue.length > 0) {
    searchable = this.props.res
      .filter((facilities: Values) => {
        return facilities.facility === this.state.facilityValue;
      })
      .filter(
        (search: Values): boolean =>
          search.message
            .toLocaleLowerCase()
            .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
          search.level
            .toLocaleLowerCase()
            .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
          search.facility
            .toLocaleLowerCase()
            .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0
      );
    return searchable;
  }
  if (this.state.SearchValue.length > 0 && this.state.LevelValue.length > 0) {
    searchable = this.props.res
      .filter((levels: Values) => levels.level === this.state.LevelValue)
      .filter((searched: Values): boolean => {
        return (
          searched.message
            .toLocaleLowerCase()
            .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
          searched.level
            .toLocaleLowerCase()
            .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
          searched.facility
            .toLocaleLowerCase()
            .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0
        );
      });
    return searchable;
  }
  searchable = this.props.res.filter(
    (search: Values): boolean =>
      search.message
        .toLocaleLowerCase()
        .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
      search.level
        .toLocaleLowerCase()
        .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0 ||
      search.facility
        .toLocaleLowerCase()
        .indexOf(this.state.SearchValue.toLocaleLowerCase()) >= 0
  );
  return searchable;

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
      return <Results res={this.props.res}/>;
    }
 };

  // for Facility  Select Options

 public FacilityFilterHandler = (): JSX.Element => {
    return (
      <Facility
        uniquefacilities={this.props.uniqueFacilities}
        FacilitiesHandler={this.FacilitiesHandler}
        disablingfacility={this.disablingfacility}
        levelvalue={this.state.LevelValue}
      />
    );
  };

  // for disabling  options of level

 public disablingOption = (): number => {
    return _.indexOf(this.props.uniqueFacilities, this.state.facilityValue);
  };

  // for disabling  options of facility

 public disablingfacility = (): number => {
    return _.indexOf(this.props.uniquelevels, this.state.LevelValue);
  };

  // for level  Select Options

  public LevelFilterHandler = (): JSX.Element => {
    return (
      <Level
        uniquelevels={this.props.uniquelevels}
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
            {this.LevelFilterHandler()} <br/>
            {this.SearchbarHandler()}
          </div>
        </div>

        <div className={classes.results}>{this.ShowingResults()}</div>
      </>
    );
  }
}

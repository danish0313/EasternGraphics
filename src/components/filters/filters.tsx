import React, { Component } from 'react';
import classes from './filters.module.css';
import Filterdata from './filterData/FilterData';
import Results from './res/res';
import Facility from './options/facility/facility';
import Level from './options/level/level';
import Searchbar from './options/searchbar/searchbar';
import _ from 'lodash';

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
  constructor(props: any) {
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

 public componentDidMount = async () => {
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
});
};

  // for refracting the api json data

  public ArrayChangeHandler = async () => {
    let ErrorLog : Array<Values>   = this.state.data;
    let results : Array<Values> = [];

    // Loop Through the ErrorLog
    for (let i = 0; i < ErrorLog.length; i++) {
      // similar indexes returned to be pushed in Results Array
      let index = await GetIndexIfLogExists(ErrorLog[i], results);

      if (index >= 0) {
        results[index].message += "\n" + ErrorLog[i].message;
      } else {
        results.push(ErrorLog[i]);
}
}

    // returning only those indexes which has same facility , level  and timeStamp

    function GetIndexIfLogExists(value: Values, arr: Array<Values>) {
      let index = -1;
      for (let i = 0; i < arr.length; i++) {
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

    //removing duplications from results array using lodash
    let unique : Array<Values>  = _.uniqBy(results, function(e: Values) {
      return e.message || e.timeStamp;
    });

    // getting unique facilities from unique array
    let AllFacility: Array<UniqueFacility>  = unique.map((facilities: any ) => {
      return facilities.facility;
    });
    let uniqueFacilities: Array<UniqueFacility> = Array.from(new Set(AllFacility));

    // getting unique levels from unique array
    let Alllevels: Array<UniqueLevel> = unique.map((levels: any) => {
      return levels.level;
    });
    let uniquelevels: Array<UniqueLevel>  = Array.from(new Set(Alllevels));

    // setting the state
    this.setState({
      res: unique,
      uniqueFacilities: uniqueFacilities,
      uniquelevels: uniquelevels
    });
  };

  // Filter handler for facility

  FacilitiesHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
   const value : string = (e.target as HTMLSelectElement).value
    
    // storing the facility value in state
    this.setState({
      facilityValue: value
    });
  };

  // Filter handler for level

  levelHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value : string = (e.target as HTMLSelectElement).value
    // storing the level value in state
    this.setState({
      LevelValue: value
    });
  };

  FacilityLevelFilter = () => {
    if (this.state.facilityValue.length > 0) {
      // getting all the facility from errorLog by mapping
      let Facilities = this.state.res.filter(
        (facilities: Values) => facilities.facility === this.state.facilityValue
      );

      return Facilities;
    } else if (this.state.LevelValue.length > 0) {
      // getting all the levels from errorLog by mapping
      let levels = this.state.res.filter(
        (levels: Values) => levels.level === this.state.LevelValue
      );
      return levels;
    }
  };

  // search Handler
  SearchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value : string = (e.target as HTMLInputElement).value
    // storing the search value in to the state
    this.setState({
      SearchValue: value
    });
  };

  // Search Filter

  SearchFilter = () => {

    let search= null;

    // filter the messages based on user inputs
   if(this.state.SearchValue.length > 0 && this.state.facilityValue.length > 0) {
    let search  = this.state.res.filter(
      (facilities: Values) => facilities.facility === this.state.facilityValue
    ).filter(
      (search: Values) : boolean =>
        search.message.toLowerCase().indexOf(this.state.SearchValue.toLowerCase())>= 0 ||
        search.level
          .toLowerCase()
          .indexOf(this.state.SearchValue.toLowerCase()) >= 0 ||
        search.facility
          .toLowerCase()
          .indexOf(this.state.SearchValue.toLowerCase()) >= 0
    );
   return search
    }else if( this.state.SearchValue.length > 0 && this.state.LevelValue.length > 0 ) {

      search  = this.state.res.filter(
        (levels: Values) => levels.level === this.state.LevelValue
      ).filter(
        (search: Values) : boolean =>
          search.message.toLowerCase().indexOf(this.state.SearchValue.toLowerCase())>= 0 ||
          search.level
            .toLowerCase()
            .indexOf(this.state.SearchValue.toLowerCase()) >= 0 ||
          search.facility
            .toLowerCase()
            .indexOf(this.state.SearchValue.toLowerCase()) >= 0
      );
      return search;
    } else {

      search  =this.state.res.filter(
        (search: Values) : boolean =>
          search.message.toLowerCase().indexOf(this.state.SearchValue.toLowerCase())>= 0 ||
          search.level
            .toLowerCase()
            .indexOf(this.state.SearchValue.toLowerCase()) >= 0 ||
          search.facility
            .toLowerCase()
            .indexOf(this.state.SearchValue.toLowerCase()) >= 0
      );
return search;
    }
  };

  // Mapping the entire array for displaying on the UI

  ShowingResults = () => {
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
    } else if (
      this.state.facilityValue === "" ||
      this.state.LevelValue === "" ||
      this.state.SearchValue === ""
    ) {
      return <Results res={this.state.res} />;
    }
  };

  // for Facility  Select Options
  FacilityFilterHandler = (): JSX.Element => {
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
  disablingOption = (): number => {
    return _.indexOf(this.state.uniqueFacilities, this.state.facilityValue);
  };

  // for disabling  options of facility
  disablingfacility = (): number => {
    return _.indexOf(this.state.uniquelevels, this.state.LevelValue);
  };

  // for level  Select Options
  LevelFilterHandler = (): JSX.Element => {
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

  SearchbarHandler = (): JSX.Element => {
    return <Searchbar searchHandler={this.SearchHandler} />;
  };

  render() {
    let ShowingResults = this.ShowingResults();
    let FacilityOptions = this.FacilityFilterHandler();
    let LevelOptions = this.LevelFilterHandler();
    let SearchbarOptions = this.SearchbarHandler();
    return (
      <>
        <div className={classes.box}>
          <h1> Error-LOG SEARCH !</h1>
          <div>
            {FacilityOptions}
            {LevelOptions} <br />
            {SearchbarOptions}
          </div>
        </div>

        <div className={classes.results}>{ShowingResults}</div>
      </>
    );
  }
}

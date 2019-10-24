import React, { Component } from "react";
import classes from "./filters.module.css";
import Filterdata from "./filterData/FilterData";
import Results from "./res/res";
import Facility from "./options/facility/facility";
import Searchbar from "./options/searchbar/searchbar";
import _ from "lodash";


type MyState = {
  data: any[],
  res: string[],
  display: boolean,
  facilityValue: string,
  uniqueFacilities: string[],
  uniquelevels: string[],
  LevelValue: string,
  filterData: string[],
  searchvalue: string,
  results: string[],
  AllFacilities : string[],
  Error: boolean
};

export default class Filters extends Component<{}, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      res: [],
      facilityValue: "",
      LevelValue: "",
      uniqueFacilities: [],
      uniquelevels: [],
      display: false,
      filterData: [],
      searchvalue: "",
      results: [],
      AllFacilities:[],
      Error: false
    };
  }

  componentDidMount = async (): Promise<void> => {
    // fetching the error log from public folder
    fetch("./errors/errors.json").then(async (logs: Response) => {
      if (logs.status !== 200) {
        this.setState({ Error: true });
        return;
      }
      await logs.json().then(data => {
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

  ArrayChangeHandler = async () => {
    let ErrorLog = this.state.data;
    let results : any = [];

    // Loop Through the ErrorLog
    for (let i = 0; i < ErrorLog.length; i++) {
      // similar indexes returned to be pushed in Results Array
      let index = await GetIndexIfLogExists(ErrorLog[i] , results);

      if (index >= 0) {
        results[index].message += "\n" + ErrorLog[i].message;
      } else {
        results.push(ErrorLog[i]);
      }
    }

    // returning only those indexes which has same facility , level  and timeStamp

    function GetIndexIfLogExists(value: any, arr: any) {
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
    let unique = _.uniqBy(results, function(e:any) {
      return e.message || e.TimeStamp;
    });

    // getting unique facilities from unique array
    let AllFacilities: string[] = unique.map((facilities: any) => {
      return facilities.facility;
    });
    let uniqueFacilities: string[] = Array.from(new Set(AllFacilities));

    // getting unique levels from unique array
    let Alllevels: string[] = unique.map((levels: any) => {
      return levels.level;
    });
    let uniquelevels: string[] = Array.from(new Set(Alllevels));

    // setting the state
    this.setState({
      res: unique,
      results: unique,
      uniqueFacilities: uniqueFacilities,
      uniquelevels: uniquelevels
    });
  };

  // Filter handler

  FacilitiesHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value }: any = e.target;

    // getting all the facility from errorLog by mapping
    let AllFacilities = this.state.res.filter(
      (facilities: any) => facilities.facility === value
    );

    // setting the state
    this.setState({
      facilityValue: value,
      filterData: AllFacilities,
      AllFacilities: AllFacilities,
      display: true
    });
  };

  // Filter handler

  levelHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value }: any = e.target;

    // getting all the facility from errorLog by mapping
    let levels = this.state.res.filter(
      (facilities: any) => facilities.level === value
    );

    // setting the state
    this.setState({
      LevelValue: value,
      filterData: levels,
      display: true
    });
  };

  // search Filter
  SearchFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const { value }: any = e.target;

    setTimeout(() => {
      // filter the messages based on user inputs
      let search = this.state.res.filter(
        (search: any) =>
          search.message.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
          search.level.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
          search.facility.toLowerCase().indexOf(value.toLowerCase()) >= 0
      );
      if (value.length > 0) {
        // setting the state
        this.setState({
          searchvalue: value,
          res: search,
          filterData :search,
          display: true
        });
      } else {
        // setting the state
        this.setState({
          res: this.state.results,
          filterData : this.state.results
        });
      }
    }, 1200);
  };

  // Mapping the entire array for displaying on the UI

  ShowingResults = () => {
    if (
      this.state.facilityValue.length > 0 ||
      this.state.LevelValue.length > 0
    ) {
      return <Filterdata filterdata={this.state.filterData} />;
    } else if (
      this.state.facilityValue === "" ||
      this.state.LevelValue === ""
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
        disablingfacility = {this.disablingfacility}
        levelvalue = {this.state.LevelValue}


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
    let facility = this.state.uniqueFacilities.filter((facility: string) => {
      return facility === this.state.facilityValue;
    });

    if (facility.includes(this.state.facilityValue)) {
      return (
        <>
          <label className={classes.label}>search by level</label>

          <select className={classes.all} onChange={e => this.levelHandler(e)}>
            <option value=""></option>
            {this.state.uniquelevels.map((level: string, i: number) => {
              return (
                <option
                  key={level + i}
                  selected={
                    _.indexOf(this.state.uniquelevels, level) ===
                    this.disablingOption()
                  }
                  disabled={
                    _.indexOf(this.state.uniquelevels, level) !==
                    this.disablingOption()
                  }
                  value={level}
                >
                  {" "}
                  {level}
                </option>
              );
            })}
          </select>
        </>
      );
    } else if (this.state.facilityValue === "") {
      return (
        <>
          <label className={classes.label}>search by level</label>

          <select className={classes.all} onChange={e => this.levelHandler(e)}>
            <option defaultValue="default"> </option>
            {this.state.uniquelevels.map((level: string, i: number) => {
              return (
                <option key={level + i} value={level}>
                  {" "}
                  {level}
                </option>
              );
            })}
          </select>
        </>
      );
    } else {
      return (
        <>
          <label className={classes.label}>search by level</label>

          <select className={classes.all} onChange={e => this.levelHandler(e)}>
            <option value=""></option>
            {this.state.uniquelevels.map((level: string, i: number) => {
              return (
                <option key={level + i} value={level}>
                  {" "}
                  {level}
                </option>
              );
            })}
          </select>
        </>
      );
    }
  };

  // search bar for searching messages

  SearchbarHandler = (): JSX.Element => {
    return <Searchbar searchfilter={this.SearchFilter} />;
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

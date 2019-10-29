import React, { PureComponent } from "react";
import classes from "./facility.module.css";
import _ from "lodash";

interface MyProps{
  uniquefacilities: any,
  FacilitiesHandler: any,
  disablingfacility: any,
  levelvalue: string
};


interface UniqueFacility {
  facility: string;

  }


interface UniqueLevel {
  level: string;
  }





export default class facility extends PureComponent<MyProps> {
  render() {
    return (
      <>
        {this.props.levelvalue.length ? (
          <>
            <label className={classes.label}>search by facility</label>

            <select
              className={classes.all}
              onChange={e => this.props.FacilitiesHandler(e)}
            >
              <option value=""> </option>
              {this.props.uniquefacilities.map(
                (facility: string, i: number) => {
                  return (
                    <option
                      key={facility + i}
                      disabled={
                        _.indexOf(this.props.uniquefacilities, facility) !==
                        this.props.disablingfacility()
                      }
                      selected={
                        _.indexOf(this.props.uniquefacilities, facility) ===
                        this.props.disablingfacility()
                      }
                      value={facility}
                    >
                      {" "}
                      {facility}
                    </option>
                  );
                }
              )}
            </select>
          </>
        ) : (
          <>
            <label className={classes.label}>search by facility</label>

            <select
              className={classes.all}
              onChange={e => this.props.FacilitiesHandler(e)}
            >
              <option value=""> </option>
              {this.props.uniquefacilities.map(
                (facility: string, i: number) => {
                  return (
                    <option key={facility + i} value={facility}>
                      {" "}
                      {facility}
                    </option>
                  );
                }
              )}
            </select>
          </>
        )}
      </>
    );
  }
}

import React, { Component } from "react";
import classes from "./level.module.css";
import _ from "lodash";

type MyProps = {
  uniquelevels: any,
  levelHandler: any,
  disablinglevel: any,
  facilityvalue: string
};

export default class facility extends Component<MyProps> {
  render() {
    return (
      <>
        {this.props.facilityvalue.length ? (
          <>
            <label className={classes.label}>search by facility</label>

            <select
              className={classes.all}
              onChange={e => this.props.levelHandler(e)}
            >
              <option value=""> </option>
              {this.props.uniquelevels.map(
                (level: string, i: number) => {
                  return (
                    <option
                      key={level + i}
                      disabled={
                        _.indexOf(this.props.uniquelevels, level) !==
                        this.props.disablinglevel()
                      }
                      selected={
                        _.indexOf(this.props.uniquelevels, level) ===
                        this.props.disablinglevel()
                      }
                      value={level}
                    >
                      {" "}
                      {level}
                    </option>
                  );
                }
              )}
            </select>
          </>
        ) : (
          <>
            <label className={classes.label}>search by Level</label>

            <select
              className={classes.all}
              onChange={e => this.props.levelHandler(e)}
            >
              <option value=""> </option>
              {this.props.uniquelevels.map(
                (level: string, i: number) => {
                  return (
                    <option key={level + i} value={level}>
                      {" "}
                      {level}
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

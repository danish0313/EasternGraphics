import React, { Component } from 'react';
import classes from './facility.module.css';
import _ from 'lodash';

interface MyProps {
  uniquefacilities: Array<string>;
  FacilitiesHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disablingfacility: () => {};
  levelvalue: string;
}

export default class Facility extends Component<MyProps> {

 public render(): JSX.Element {
    return (
      <>
        {this.props.levelvalue.length ? (
          <>
            <label className={classes.label}>search by facility</label>

            <select
              className={classes.all}
              onChange={(e) => {
                return this.props.FacilitiesHandler(e);
              }}
            >
              <option value=""/>
              {this.props.uniquefacilities.map(
                (facilities: string, i: number) => {
                  return (
                    <option
                      key={facilities + i}
                      disabled={
                        _.indexOf(this.props.uniquefacilities, facilities) !==
                        this.props.disablingfacility()
                      }
                      selected={
                        _.indexOf(this.props.uniquefacilities, facilities) ===
                        this.props.disablingfacility()
                      }
                      value={facilities}
                    >
                      {''}
                      {facilities}
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
              onChange={(e) => this.props.FacilitiesHandler(e)}
            >
              <option value=""/>
              {this.props.uniquefacilities.map(
                (facilities: string, i: number) => {
                  return (
                    <option key={facilities + i} value={facilities}>
                      {''}
                      {facilities}
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

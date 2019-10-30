import React, { Component } from 'react';
import classes from './facility.module.css';
import _ from 'lodash';

interface MyProps {
  uniquefacilities: any;
  FacilitiesHandler: any;
  disablingfacility: any;
  levelvalue: string;
}
interface UniqueFacility {
facility: string;

  }
interface UniqueLevel {
  level: string;
  }
export default class facility extends Component<MyProps> {
 public render(): JSX.Element {
    return (
      <>
        {this.props.levelvalue.length ? (
          <>
            <label className={classes.label}>search by facility</label>

            <select
              className={classes.all}
              onChange={e => {
                return this.props.FacilitiesHandler(e);
              }}
            >
              <option value=''> </option>
              {this.props.uniquefacilities.map(
                (facilities: string, i: number) => {
                  return (
                    <option
                      key={facilities + i}
                      disabled={
                        _.indexOf(this.props.uniquefacilities,facilities) !==
                        this.props.disablingfacility()
                      }
                      selected={
                        _.indexOf(this.props.uniquefacilities,facilities) ===
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
              onChange={e => this.props.FacilitiesHandler(e)}
            >
              <option value=''> </option>
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

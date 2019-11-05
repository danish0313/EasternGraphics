import React, { Component } from 'react';
import classes from './level.module.css';
import _ from 'lodash';

interface MyProps {
  uniquelevels: Array<string>;
  levelHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disablinglevel: () => {};
  facilityvalue: string;
}


export default class Level extends Component<MyProps> {
  public render(): JSX.Element {
    return (
      <>
        {this.props.facilityvalue.length ? (
          <>
            <label className={classes.label}>search by Level</label>

            <select
              className={classes.all}
              onChange={(e) => {
                return this.props.levelHandler(e);
              }}
            >
              <option value="" />
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
                      {''}
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
                onChange={(e) => {
                  return this.props.levelHandler(e);
                }}
              >
                <option value="" />
                {this.props.uniquelevels.map(
                  (level: string, i: number) => {
                    return (
                      <option key={level + i} value={level}>
                        {''}
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

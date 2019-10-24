import React, { Component } from 'react'
import classes from './facility.module.css'


type MyProps = {
    uniquefacilities: any,
    FacilitiesHandler: any 
        
    }

export default class facility extends Component<MyProps> {
    render() {
        return (
        
                  <>
        <label className={classes.label}>search by facility</label>

        <select
          className={classes.all}
          onChange={e => this.props.FacilitiesHandler(e)}
        >
          <option value=""> </option>
          {this.props.uniquefacilities.map((facility: string, i: number) => {
            return (
              <option key={facility + i} value={facility}>
                {" "}
                {facility}
              </option>
            );
          })}
        </select>
      </>
          
        )
    }
}

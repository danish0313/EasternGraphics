 import React, { Component } from 'react'
 import classes from './FilterData.module.css';

 type MyProps = {
    filterdata: string[],
 }
 export default class FilterData extends Component<MyProps> {
     render() {
         return (
             <div>
                 {this.props.filterdata.map((data: any, index: number) => (
        <div key={data.message}>
          <span> Facility: {data.facility} </span> <br /> <br />
          <span> Level: {data.level} </span> <br />
          <span>message:</span> <br />
          {data.message.split("\n").map((item: any, i: number) => {
            return <p key={item + i}>{item} </p>;
          })}
          <p className={classes.timestamp}> TimeStamp: {new Date(data.timeStamp).toUTCString()} </p>
          <hr />
        </div>
             
         ) )   }  
         </div> )
     }
 }
 
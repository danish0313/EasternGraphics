import React, { PureComponent } from 'react';
import classes from './res.module.css';

interface MyProps {
   res: any;
}
export default class Data extends PureComponent<MyProps> {
 public render(): JSX.Element {
        return (
            <div>
                {this.props.res.map((data: any, index: number) => (
       <div key={data.message}>
         <span> Facility: {data.facility} </span> <br /> <br />
         <span> Level: {data.level} </span> <br />
         <span>message:</span> <br />
         {data.message.split('\n').map((item: any, i: number) => {
           return <p key={item + i}>{item} </p>;
         })}
         <p className={classes.timestamp}> TimeStamp: {new Date(data.timeStamp).toUTCString()} </p>
         <hr />
       </div>
        ))}
        </div>)
}
}

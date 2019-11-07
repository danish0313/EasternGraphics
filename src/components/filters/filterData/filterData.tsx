import React, { Component } from 'react';
import classes from './filterData.module.css';
import { Values } from '../../../App';
interface MyProps {
    FacilityLevelFilter: any;
    SearchFilter: any;
    SearchValue: string;
}

export default class FilterData extends Component<MyProps> {
    public render(): JSX.Element {
        let filteredData: string = '';
        if (this.props.SearchValue.length > 0) {
            filteredData = this.props
                .SearchFilter()
                .map((data: Values, index: number) => (
                    <div key={data.message}>
                        <span> Facility: {data.facility} </span> <br /> <br />
                        <span> Level: {data.level} </span> <br />
                        <span>message:</span> <br />
                        {data.message.split('\n').map((item: string, i: number) => {
                            return <p key={item + i}>{item} </p>;
                        })}
                        <p className={classes.timestamp}>
                            {''}
                            TimeStamp: {new Date(data.timeStamp).toUTCString()}{''}
                        </p>
                        <hr />
                    </div>
                ));
        } else {
            filteredData = this.props
                .FacilityLevelFilter()
                .map((data: Values, index: number) => (
                    <div key={data.message}>
                        <span> Facility: {data.facility} </span> <br /> <br />
                        <span> Level: {data.level} </span> <br />
                        <span>message:</span> <br />
                        {data.message.split('\n').map((item: string, i: number) => {
                            return <p key={item + i}>{item} </p>;
                        })}
                        <p className={classes.timestamp}>
                            {''}
                            TimeStamp: {new Date(data.timeStamp).toUTCString()}{''}
                        </p>
                        <hr />
                    </div>
                ));
        }

        return <div>{filteredData}</div>;
    }
}
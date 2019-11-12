import React, { Component, ReactNodeArray } from 'react';
import classes from './filterData.module.css';
import { Values } from '../../../App';
interface MyFilterDataProps {
    facilityFilter: () => Array<Values>;
    levelFilter: () => Array<Values>;
    searchFilter: () => Array<Values>;
    searchValue: string;
    levelValue: string;
    facilityValue: string;
}

export default class FilterData extends Component<MyFilterDataProps> {
    public render(): JSX.Element {
        let filteredData: ReactNodeArray = [];
        if (this.props.searchValue.length > 0) {
            filteredData = this.props
                .searchFilter()
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
            filteredData = this.props.levelValue ? this.props.facilityFilter().map((data: Values, index: number) => (
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
            ))
                : this.props.levelFilter().map((data: Values, index: number) => (
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
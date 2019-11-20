import React, { Component, ReactNodeArray } from 'react';
import classes from './filterData.module.css';
import { Values } from '../../../App';
interface MyFilterDataProps {

    searchFilter: () => Array<Values>;

}

export default class FilterData extends Component<MyFilterDataProps> {
    public render(): JSX.Element {
        let filteredData: ReactNodeArray = [];

        filteredData = this.props
            .searchFilter()
            .map((data: Values, index: number) => (
                <div key={data.content + index}>
                    <span> Facility: {data.facility} </span> <br /> <br />
                    <span> Level: {data.level} </span> <br />
                    <span>message:</span> <br />
                    {data.content.split('\n').map((item: string, i: number) => {
                        return <p key={item + i}>{item} </p>;
                    })}
                    <p className={classes.timestamp}>
                        {''}
                        TimeStamp: {new Date(data.date).toUTCString()}{''}
                    </p>
                    <hr />
                </div>
            ));
        return <div>{filteredData}</div>;
    }
}
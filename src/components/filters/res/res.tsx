import React, { PureComponent } from 'react';
import classes from './res.module.css';
import { Values } from '../../../App';
interface MyResultsProps {
    results: Array<Values>;
}

export default class Results extends PureComponent<MyResultsProps> {
    public render(): JSX.Element {
        return (
            <div>
                {this.props.results.map((data: Values, index: number) => (
                    <div key={data.content + index}>
                        <span> Level: {data.level} </span> <br />
                        <span>content:</span> <br />
                        {data.content.split('\n').map((item: string, i: number) => {
                            return <p key={item + i}>{item} </p>;
                        })}
                        <p className={classes.timestamp}> TimeStamp: {new Date(data.date).toUTCString()} </p>
                        <hr />
                    </div>
                ))}
            </div>);
    }
}
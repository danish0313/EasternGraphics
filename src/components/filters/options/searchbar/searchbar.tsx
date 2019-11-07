import React, { PureComponent } from 'react';
import classes from './searchBar.module.css';
interface MyProps {
    searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class SearchBar extends PureComponent<MyProps> {
    public render(): JSX.Element {
        const handleClick: React.ChangeEventHandler  = (e: React.ChangeEvent<HTMLInputElement>) => this.props.searchHandler(e);
        return (
            <div className={classes.searchbox}>
                <label className={classes.label}>SEARCH YOUR MESSAGES:</label>
                <input
                    className={classes.search}
                    onChange={handleClick}
                    type="search"
                    id="site search"
                    aria-label="Search through messages"
                />
            </div>
        );
    }
}
import React, { PureComponent } from 'react';
import classes from './searchBar.module.css';
interface MyProps {
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class SearchBar extends PureComponent<MyProps> {
  public render(): JSX.Element {
    return (
      <div className={classes.searchbox}>
        <label className={classes.label}>SEARCH YOUR MESSAGES:</label>
        <input
          className={classes.search}
          onChange={(event) => {
            return this.props.searchHandler(event);
          }}
          type="search"
          id="site search"
          aria-label="Search through messages"
        />
      </div>
    );
  }
}

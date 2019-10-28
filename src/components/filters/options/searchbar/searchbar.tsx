import React, { PureComponent } from 'react'
import classes from './searchbar.module.css'
type MyProps = {
    searchHandler : any
}

export default class searchbar extends PureComponent<MyProps> {
    render() {
      
            return (
                <div className={classes.searchbox}>
                  <label className={classes.label}>SEARCH YOUR MESSAGES:</label>
                  <input
                    className={classes.search}
                    onChange={e => this.props.searchHandler(e)}
                    type="search"
                    id="site-search"
                    aria-label="Search through messages"
                  />
                </div>
              );
       
    }
}

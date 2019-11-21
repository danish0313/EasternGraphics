import React, { PureComponent } from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';

// import classes from './searchBar.module.css';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
interface MySearchBarProps {
    searchHandler: (newValue: string) => void;
    label: string;
}
interface MySearchBarState {
    searchText: string | undefined;
}

export default class SearchBar extends PureComponent<MySearchBarProps, MySearchBarState> {
    constructor(props: MySearchBarProps) {
        super(props);
        this.state = {
            searchText: undefined

        };
    }
    public render(): JSX.Element {
        const handleClick: (e: React.ChangeEvent<HTMLInputElement> | undefined, newValue?: string | undefined) => void
        = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
            if (e == null) {
                return;
            }
            const value: string = e.target.value;
            this.props.searchHandler(value);
        };

        return (
            <>
                <Label style={{ textAlign: 'center' }}>{this.props.label}</Label>
                <SearchBox
                    styles={{ root: { width: '70vh', margin: '0 auto', height: 40 } }}
                    placeholder="Search"
                    onChange={handleClick}
                />
            </>
        );
    }
}
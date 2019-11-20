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
    //  handleClick  = (e:React.ChangeEvent<HTMLInputElement>) => this.props.searchHandler(e);
    public render(): JSX.Element {

        return (
        <>
            <Label style={{ textAlign: 'center' }}>{this.props.label}</Label>
            <SearchBox
                styles={{ root: { width: 700, margin: '0 auto', height: 40 } }}
                placeholder="Search"
                onChange={(newValue) => this.onChangeHandler(newValue)}
            />
        </>
        );
    }
    private onChangeHandler = (newValue: React.ChangeEvent<HTMLInputElement> | undefined) => {
        if (newValue == null) {
            return;
        }
        const value: string = newValue.target.value;
        this.props.searchHandler(value);
    };
}
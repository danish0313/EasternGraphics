import React, { PureComponent } from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
interface MySearchBarProps {
    searchHandler: (newValue: string) => void;
    label: string;
}
interface MySearchBarState {
    searchText: string | undefined;
    suggestions: boolean;
}

export default class SearchBar extends PureComponent<MySearchBarProps, MySearchBarState> {
    constructor(props: MySearchBarProps) {
        super(props);
        this.state = {
            searchText: undefined,
            suggestions: false

        };
    }
    public render(): JSX.Element {

        return (
            <>
                <Label style={{ textAlign: 'center' }}>{this.props.label}</Label>
                <SearchBox
                    styles={{ root: { width: '60vh', margin: '0 auto', height: 40 } }}
                    placeholder="Search Your Content!"
                    iconProps={{ iconName: 'Filter' }}
                    onChange={this.handleClick}
                    onFocus={() => this.setState({ suggestions: !this.state.suggestions })}
                />
                {this.state.suggestions ? (
                <div
                   style={{ width: '60vh', margin: '0 auto', height: '100px',
                   border: '1px solid grey', borderTop: 'none' }}
                />)
                : null}
            </>
        );
    }

    private handleClick = (e: React.ChangeEvent<HTMLInputElement> | undefined, newValue?: string | undefined): void => {
        if (e == null) {
            return;
        }
        const value: string = e.target.value;
        this.props.searchHandler(value);
    };
}
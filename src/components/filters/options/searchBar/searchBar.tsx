import React, { PureComponent } from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
interface MySearchBarProps {
    searchHandler: (option: string, key: string, value?: string, start?: number, end?: number) => void;
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
        return (
            <>
                <Label style={{ textAlign: 'center', marginTop: '10px' }}>
                    {this.props.label}</Label>
                <SearchBox
                    styles={{ root: { width: '60vh', margin: '0 auto', height: 40 } }}
                    placeholder="Search Your Content!"
                    iconProps={{ iconName: 'Filter' }}
                    onChange={this.handleChange}
                    onClear={this.handleChange}
                />
            </>
        );
    }
    private handleChange = (e: React.ChangeEvent<HTMLInputElement> | undefined, newValue?: string | undefined): void => {
        if (e == null) {
            return;
        }
        const value: string = e.target.value;
        this.props.searchHandler('', '', value);
    };

}

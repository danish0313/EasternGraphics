import React, { Component } from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';
initializeIcons(/* optional base url */);
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
        width: 290,
        margin: '0 auto'
    },

};
const stackTokens: IStackTokens = { childrenGap: 20 };
interface MyOptionsProps {
    options: Array<string>;
    label: string;
    handler: (option: string, key: string, value?: string, start?: number, end?: number) => void;
}

type PropsType = MyOptionsProps & RouteComponentProps<{}>;
class Options extends Component<PropsType> {
    private _isMounted: boolean = false;
    public render(): JSX.Element {
        return (
            <>

                <Stack tokens={stackTokens} >
                    <Dropdown
                        placeholder="Select an option"
                        label={`Search By ${this.props.label}`}
                        ariaLabel="Custom dropdown example"
                        options={this.props.options.map((item: string, index: number) => { return { key: `${this.props.label}${index}`, text: item }; })}
                        styles={dropdownStyles}
                        onChange={this.handleClick}
                    />
                </Stack>

            </>

        );
    }
    public componentDidMount = () => {
        this._isMounted = true;
        if (this.props.history.location.state && this._isMounted === true) {
            const text: string = this.props.history.location.state.text;
            const key: string = this.props.history.location.state.key;
            this.props.handler(text, key);
        }
    };
    public componentWillUnmount = () => {
        this._isMounted = false;
    };
    private handleClick = (e?: React.FormEvent<HTMLDivElement> | undefined, option?: IDropdownOption | undefined, index?: number | undefined): void => {
        if (e == null || option == null) {
            return;
        }
        const keys: string = option.key.toString().replace(/[0-9]/, '');
        this.props.handler(option.text, keys);

    };
}
export default withRouter(Options);
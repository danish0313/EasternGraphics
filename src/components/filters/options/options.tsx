import React, { Component } from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
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
    handler: (value: string , start?: number , end?: number) => void;
    label: string;
}
export default class Options extends Component<MyOptionsProps> {
    public render(): JSX.Element {

        return (
            <>
                <Stack tokens={stackTokens} >
                    <Dropdown
                        placeholder="Select an option"
                        label={this.props.label}
                        ariaLabel="Custom dropdown example"
                        options={this.props.options.map((item) => { return { key: item, text: item }; })}
                        styles={dropdownStyles}
                        onChange={this.handleClick}
                    />
                </Stack>

            </>

        );
    }
    private handleClick = (e: React.FormEvent<HTMLDivElement> | undefined, option?: IDropdownOption | undefined, index?: number | undefined): void => {
        if (e == null || option == null) {
            return;
        }
        this.props.handler(option.text);
    };
}
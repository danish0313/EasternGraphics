import React, { Component } from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
        width: 300,
        margin: '0 auto'
    },

};
const stackTokens: IStackTokens = { childrenGap: 20 };
interface MyFacilityProps {
    options: Array<string>;
    handler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
}
export default class Options extends Component<MyFacilityProps> {
    public render(): JSX.Element {

        // const handleClick: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.handler(e);
        return (
            <>
                <Stack tokens={stackTokens} >
                    <Dropdown
                        placeholder="Select an option"
                        label={this.props.label}
                        ariaLabel="Custom dropdown example"
                        options={this.props.options.map((item) => { return { key: item, text: item }; })}
                        styles={dropdownStyles}
                        onChange={(e, option?: IDropdownOption) => console.log(e, option)}
                    />
                </Stack>

            </>

        );
    }
}
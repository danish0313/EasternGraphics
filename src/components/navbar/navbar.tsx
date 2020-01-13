import React, { Component } from 'react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

export default class NavBar extends Component {
    private items: Array<ICommandBarItemProps> = [
        {
            key: 'Home',
            text: 'Home',
            iconProps: { iconName: 'Home' },
            onClick: () => console.log('Share')
        },
        {
            key: 'Graph Details',
            text: 'Graph Details',
            iconProps: { iconName: 'GitGraph' },
        },

    ];
    public render(): JSX.Element {
        return (
            <div>
                <CommandBar
                    items={this.items}
                    overflowButtonProps={overflowProps}
                    ariaLabel="Use left and right arrow keys to navigate between commands"
                />
            </div>
        );
    }

}
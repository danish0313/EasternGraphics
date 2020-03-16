import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';

export default class NavBar extends Component {
    public render(): JSX.Element {
        const home: IIconProps = { iconName: 'Home' };
        const graph: IIconProps = { iconName: 'GitGraph' };

        return (
            <>
                <Link to="http://cideploy-nossl.tmp.easterngraphics.com/project-students/cloud-error-log/master/">
                    <ActionButton iconProps={home}>
                        home
                </ActionButton>
                </Link>
                <Link to="http://cideploy-nossl.tmp.easterngraphics.com/project-students/cloud-error-log/master/graph">
                    <ActionButton iconProps={graph}>
                        Graph Details
                </ActionButton> </Link>
            </>
        );
    }
}
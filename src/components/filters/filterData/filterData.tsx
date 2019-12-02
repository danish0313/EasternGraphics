import React, { Component } from 'react';
import { Values } from '../../../App';
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';

interface MyFilterDataProps {
    filteredArray: Array<Values>;
    results: Array<Values>;
    facilityValue: string;
    levelValue: string;
    searchValue: string;
    loading: boolean;
}
export interface DetailsListBasicItem {
    key: string;
    name: string;
    fieldName: string;
    minWidth: number;
    maxWidth: number;
    isResizable: boolean;
}
export interface Data {
    Level?: string;
    Facility?: string;
    Content: string | any;
    TimeStamp: string;
}
const addFriendIcon: IIconProps = { iconName: 'Copy' };
export default class FilterData extends Component<MyFilterDataProps> {
    private hostId: string = getId('tooltipHost');

    public render(): JSX.Element {

        // Populate with items for datalist.
        let array: Array<Values> = [];
        if (this.props.facilityValue.length > 0 || this.props.levelValue.length > 0 || this.props.searchValue.length > 0) {
            array = this.props.filteredArray;
        } else {
            array = this.props.results;

        }
        const data: Array<Data> = [];
        for (let i: number = 0; i < array.length; i++) {
            data.push({
                Level: array[i].level,
                Facility: array[i].facility,
                Content: array[i].content.split('</br>').map((contents, index: number) => (
                    <pre key={contents + index}>
                        <TooltipHost
                            content={`Content = ${array[i].content}`}
                            closeDelay={500}
                            id={this.hostId}
                            calloutProps={{ gapSpace: 0 }}
                            styles={{ root: { display: 'inline-block' } }}
                        >{contents} <br/>
                            <ActionButton iconProps={addFriendIcon} onClick={() => this.handleClick(contents)} style={{ marginLeft: '30px' }}>
                                Copy!
                      </ActionButton>
                        </TooltipHost>
                    </pre>)),
                TimeStamp: new Date(array[i].date).toUTCString()
            });
        }

        const columns: Array<DetailsListBasicItem> = [
            { key: 'column2', name: 'Level', fieldName: 'Level', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column3', name: 'Facility', fieldName: 'Facility', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column4', name: 'Content', fieldName: 'Content', minWidth: 50, maxWidth: 1200, isResizable: true },
            { key: 'column5', name: 'TimeStamp', fieldName: 'TimeStamp', minWidth: 100, maxWidth: 150, isResizable: true }
        ];
        return (
            <div>{this.props.loading ? (<Spinner label="Waiting for Content..." ariaLive="assertive" labelPosition="top" size={SpinnerSize.large} />
            ) :
                (<Fabric>

                    <DetailsList
                        items={data}
                        columns={columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                    />
                </Fabric>)}
            </div>);
    }

    private handleClick = (event: string) => {
        const textArea: HTMLTextAreaElement = document.createElement('textarea');
        textArea.value = event;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        textArea.remove();
        alert(`Copied to clipboard!, ${event}`);
    };
}
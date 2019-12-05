import React, { Component } from 'react';
import { Values } from '../../../App';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
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
    Content?: React.ReactNode;
    TimeStamp?: string | number;
    Copy?: React.ReactNodeArray;
}
const addFriendIcon: IIconProps = { iconName: 'Copy' };
export default class FilterData extends Component<MyFilterDataProps> {
    public render(): JSX.Element {
        // Populate with items for datalist.
        const results: Array<Values> = this.props.filteredArray.length > 0 ? this.props.filteredArray : this.props.results;
        const data: Array<Data> = [];
        for (const i of results) {
            data.push({
                Level: i.level,
                Facility: i.facility,
                Content: (
                    <pre>
                        {i.content.split('<br/>').map((contents, index: number) => (
                            <div key={contents + index}>
                                {contents}
                            </div>))}
                    </pre>
                ),
                TimeStamp: new Date(Number(i.date) *1000).toString(),
                Copy: i.content.split('<br/>').map((contents, index: number) => (
                    <ActionButton
                        key={contents + index}
                        iconProps={addFriendIcon}
                        onClick={() => this.handleClick(contents)}
                        style={{ marginRight: '30px' }}
                    />))
            });
        }

        const columns: Array<DetailsListBasicItem> = [
            { key: 'column1', name: '', fieldName: 'Copy', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column2', name: 'Level', fieldName: 'Level', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column3', name: 'Facility', fieldName: 'Facility', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column4', name: 'Content', fieldName: 'Content', minWidth: 50, maxWidth: 1050, isResizable: true },
            { key: 'column5', name: 'TimeStamp', fieldName: 'TimeStamp', minWidth: 100, maxWidth: 250, isResizable: true }
        ];
        return (
            <div>{this.props.loading ? (<Spinner label="Waiting for Content..." ariaLive="assertive" labelPosition="top" size={SpinnerSize.large} />
            ) :
                (
                    <Fabric>
                        <DetailsList
                            items={data}
                            columns={columns}
                            selectionMode={SelectionMode.none}
                            setKey="set"
                            layoutMode={DetailsListLayoutMode.justified}
                            selectionPreservedOnEmptyClick={true}
                            ariaLabelForSelectionColumn="Toggle selection"
                            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            checkButtonAriaLabel="Row checkbox"
                        />
                    </Fabric>
                )}
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
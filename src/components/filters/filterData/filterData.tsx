import React, { Component } from 'react';
import { Values } from '../../../App';
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
interface MyFilterDataProps {
    searchFilter: () => Array<Values>;
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
    Id: number;
    Level?: string;
    Facility?: string;
    Content: string | any;
    TimeStamp: string;
}
export default class FilterData extends Component<MyFilterDataProps> {
    private hostId: string = getId('tooltipHost');
    public render(): JSX.Element {

        // Populate with items for datalist.
        let array: Array<Values> = [];
        if (this.props.facilityValue.length > 0 || this.props.levelValue.length > 0 || this.props.searchValue.length > 0) {
            array = this.props.searchFilter();
        }
        else {
            array = this.props.results;

        }

        const data: Array<Data> = [];
        for (let i: number = 0; i < array.length; i++) {
            data.push({
                Id: i,
                Level: array[i].level,
                Facility: array[i].facility,
                Content: array[i].content.split('=').map((j, index: number) => (
                    <pre key={j + index}>
                        <TooltipHost
                            content={`Content = ${array[i].content}`}
                            closeDelay={500}
                            id={this.hostId}
                            calloutProps={{ gapSpace: 0 }}
                            styles={{ root: { display: 'inline-block' } }}
                        >{j}
                        </TooltipHost>
                    </pre>)),
                TimeStamp: new Date(array[i].date).toUTCString()
            });
        }

        const columns: Array<DetailsListBasicItem> = [
            { key: 'column1', name: 'Id', fieldName: 'Id', minWidth: 20, maxWidth: 50, isResizable: true },
            { key: 'column2', name: 'Level', fieldName: 'Level', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column3', name: 'Facility', fieldName: 'Facility', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column4', name: 'Content', fieldName: 'Content', minWidth: 50, maxWidth: 1000, isResizable: true },
            { key: 'column5', name: 'TimeStamp', fieldName: 'TimeStamp', minWidth: 100, maxWidth: 150, isResizable: true }
        ];
        return (
            <div>{this.props.loading ? (<div className="loadingio-spinner-dual-ring-0ziandjjgd3e"><div className="ldio-lybarkgpaal">
                <div/><div/><div/><div/><div/><div/>
            </div></div>) :
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
                </Fabric>)
            }
            </div>);
    }
}
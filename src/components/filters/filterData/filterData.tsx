import React, { Component } from 'react';
import { Values } from '../../../App';
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsListBasicItem, Data } from '../res/res';
interface MyFilterDataProps {
    searchFilter: () => Array<Values>;
}
export default class FilterData extends Component<MyFilterDataProps> {
    public render(): JSX.Element {

        // Populate with items for datalist.
        const array: Array<Values> = this.props.searchFilter();
        const data: Array<Data> = [];
        for (let i: number = 0; i < array.length; i++) {
            data.push({
                Id: i,
                Level: array[i].level,
                Facility: array[i].facility,
                Content: array[i].content,
                TimeStamp: new Date(array[i].date).toUTCString()
            });
        }

        const columns: Array<DetailsListBasicItem> = [
            { key: 'column1', name: 'Id', fieldName: 'Id', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'column2', name: 'Level', fieldName: 'Level', minWidth: 100, maxWidth: 100, isResizable: true },
            { key: 'column3', name: 'Facility', fieldName: 'Facility', minWidth: 100, maxWidth: 100, isResizable: true },
            { key: 'column4', name: 'Content', fieldName: 'Content', minWidth: 100, maxWidth: 900, isResizable: true },
            { key: 'column5', name: 'TimeStamp', fieldName: 'TimeStamp', minWidth: 100, maxWidth: 200, isResizable: true }
        ];
        return (
            <div>
                <Fabric>
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
                </Fabric>
            </div>);
    }
}
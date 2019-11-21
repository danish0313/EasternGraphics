import React, { PureComponent } from 'react';
import { DetailsList, DetailsListLayoutMode} from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Values } from '../../../App';
interface MyResultsProps {
    results: Array<Values>;
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
    Content: string;
    TimeStamp: string;
}
export default class Results extends PureComponent<MyResultsProps> {
    public render(): JSX.Element {
        // Populate with items for datalist.
        const array: Array<Values> = this.props.results;
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
import React, { Component } from 'react';
import { Values } from '../../../App';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import DialogLargeHeader from '../options/dialog/dialog';

interface MyFilterDataProps {
    filteredArray: Array<Values>;
    arrayWithoutFilter: Array<Values>;
    loading: boolean;
    label: string;
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
    Copy?: React.ReactNode;
    Dialog?: React.ReactNode;
}

interface MyFilterDataState {
    dialogOpen: boolean;
}

export default class FilterData extends Component<MyFilterDataProps, MyFilterDataState> {

    constructor(props: MyFilterDataProps) {
        super(props);
        this.state = {
            dialogOpen: true,

        };
    }

    public render(): JSX.Element {
        // Populate with items for datalist.
        const results: Array<Values> = this.props.filteredArray.length > 0 ? this.props.filteredArray : this.props.arrayWithoutFilter;
        const data: Array<Data> = [];
        for (const i of results) {
            data.push({
                Level: i.level,
                Facility: i.facility,
                Content: (
                    <pre>
                        {i.content}
                    </pre>
                ),
                TimeStamp: new Date(Number(i.date) * 1000).toLocaleString('en-US').split('/').join('-'),
                Copy: (
                    <IconButton
                        key={i.content}
                        iconProps={{ iconName: 'Copy' }}
                        title="Copy"
                        ariaLabel="Copy"
                        onClick={() => this.handleClick(i.content)}
                        style={{ marginRight: '30px' }}
                    />),
                Dialog: (
                    <IconButton
                        onClick={this.showDialog}
                        iconProps={{ iconName: 'Comment' }}
                        title="comments"
                        ariaLabel="Comments"
                        style={{ marginRight: '30px' }}
                    />)
            });
        }

        const columns: Array<DetailsListBasicItem> = [
            { key: 'column1', name: '', fieldName: 'Copy', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'column2', name: '', fieldName: 'Dialog', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'column3', name: 'Level', fieldName: 'Level', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column4', name: 'Facility', fieldName: 'Facility', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column5', name: 'Content', fieldName: 'Content', minWidth: 50, maxWidth: 1300, isResizable: true },
            { key: 'column6', name: 'TimeStamp', fieldName: 'TimeStamp', minWidth: 100, maxWidth: 100, isResizable: true }
        ];

        return (
            <>
                <DialogLargeHeader dialog={this.state.dialogOpen} dialogOpen={this.showDialog} DialogHide={this.closeDialog} />

                <div>{this.props.loading ? (<Spinner label={this.props.label} ariaLive="assertive" labelPosition="bottom" size={SpinnerSize.large} />
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
                </div>   </>);
    }
    private handleClick = (event: string) => {
        const textArea: HTMLTextAreaElement = document.createElement('textarea');
        textArea.value = event;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('Copy');
        textArea.remove();
    };

    private showDialog = (): void => {
        this.setState({ dialogOpen: false });
    };
    private closeDialog = (): void => {
        this.setState({ dialogOpen: true });
    };
}
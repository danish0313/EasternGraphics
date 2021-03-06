import React, { Component } from 'react';
import { Results } from '../../../App';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import DialogLargeHeader from '../options/dialog/dialog';

interface MyFilterDataProps {
    filteredArray: Array<Results>;

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
    Count?: React.ReactNode;
}

interface MyFilterDataState {
    dialogOpen: boolean;
    content: string;
}

export default class FilterData extends Component<MyFilterDataProps, MyFilterDataState> {

    constructor(props: MyFilterDataProps) {
        super(props);
        this.state = {
            dialogOpen: true,
            content: ''

        };
    }
    public render(): JSX.Element {
        // Populate with items for datalist.
        const results: Array<Results> = this.props.filteredArray;
        const data: Array<Data> = [];
        for (const i of results) {

            const textCopy: () => void = () => this.handleClick(i.content);

            data.push({
                Count: (<div className="notification"><span className="countBadge">{i._count} </span> </div>),
                Level: i.level,
                Facility: i.facility,
                Content: (
                    <pre>
                        {i.content}
                    </pre>
                ),
                TimeStamp: new Date(Number(i.date)).toLocaleString('en-US').split('/').join('-'),
                Copy: (
                    <IconButton
                        key={i.content}
                        iconProps={{ iconName: 'Copy' }}
                        title="Copy"
                        ariaLabel="Copy"
                        onClick={textCopy}
                        style={{ marginRight: '30px' }}
                    />),
                Dialog: (
                    <IconButton
                        onClick={this.showDialog}
                        iconProps={{ iconName: 'Comment' }}
                        title="comments"
                        ariaLabel="Comments"
                        style={{ marginRight: '30px' }}
                    />
                )
            });
        }
        const columns: Array<DetailsListBasicItem> = [
            { key: 'column1', name: '', fieldName: 'Copy', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'column2', name: '', fieldName: 'Dialog', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column3', name: 'Level', fieldName: 'Level', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column4', name: 'Facility', fieldName: 'Facility', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column5', name: 'Count', fieldName: 'Count', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'column6', name: 'Content', fieldName: 'Content', minWidth: 50, maxWidth: 1300, isResizable: true },
            { key: 'column7', name: 'TimeStamp', fieldName: 'TimeStamp', minWidth: 100, maxWidth: 100, isResizable: true }
        ];

        let dataNotFound: JSX.Element | string =  '';

        if (this.props.label) {
            dataNotFound = (<p style={{color: '#0078D4'}}>{this.props.label} </p>);

        } else {
            dataNotFound = (<Spinner ariaLive="assertive" labelPosition="bottom" size={SpinnerSize.large} />);
        }

        return (
            <>
                <DialogLargeHeader dialog={this.state.dialogOpen} dialogOpen={this.showDialog} DialogHide={this.closeDialog} />

                <div>{this.props.loading ? dataNotFound
                    :
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
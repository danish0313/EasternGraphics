import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface DialogLargeHeaderProps {
    dialog: boolean;
    dialogOpen: () => void;
    DialogHide: () => void;
}

export default class DialogLargeHeader extends React.PureComponent<DialogLargeHeaderProps> {

    public render(): JSX.Element {
        return (
            <div>
                <Dialog
                    hidden={this.props.dialog}
                    onDismiss={this.props.DialogHide}
                    dialogContentProps={{
                        type: DialogType.largeHeader,
                        title: 'Add Comments to ErrosLog',
                        subText: 'Please enter your Comments for Specific ErrorLogs :)'
                    }}
                    modalProps={{
                        isBlocking: false,
                        styles: { main: { maxWidth: 450 } }
                    }}
                >
                    <ChoiceGroup
                        options={[
                            {
                                key: 'Important',
                                text: 'Important'
                            },
                            {
                                key: 'Not Important',
                                text: 'Not Important',
                            }
                        ]}
                    //  onChange={this.handleChange}
                    />

                    <TextField
                        styles={{ root: { marginTop: '30px' } }}
                        label="Comments TextArea..."
                        //  onChange={this.handleClick}
                        multiline={true}
                        rows={3}
                    />
                    <DialogFooter>
                        <PrimaryButton onClick={this.props.DialogHide} text="Save" />
                        <DefaultButton onClick={this.props.DialogHide} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }
    //  private handleChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined) => {
    //      console.log(option);
    //   };
    // private handleClick = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> | undefined, newValue?: string | undefined): void => {
    //      if (e == null) {
    //         return;
    //     }
    //     console.log(newValue);
    //  };
}
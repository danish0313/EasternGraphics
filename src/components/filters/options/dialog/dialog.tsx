import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface DialogLargeHeaderProps {
    dialog: boolean;
    dialogOpen: () => void;
    DialogHide: () => void;
}
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 200 }
};

export default class DialogLargeHeader extends React.PureComponent<DialogLargeHeaderProps> {

    public render(): JSX.Element {
        const options: Array<IDropdownOption> = [
            { key: '', text: '' },
            { key: 'important', text: 'important' },
            { key: 'not important', text: 'not important' },
        ];
        return (
            <div>
                <Dialog
                    hidden={this.props.dialog}
                    onDismiss={this.props.DialogHide}
                    dialogContentProps={{
                        type: DialogType.largeHeader,
                        title: 'Add Comments to Error Log',
                        subText: 'Please enter your Comments for Specific ErrorLogs :)'
                    }}
                    modalProps={{
                        isBlocking: false,
                        styles: { main: { maxWidth: 450 } }
                    }}
                >
                    <TextField
                        styles={{ root: { marginTop: '30px' } }}
                        label="Comments TextArea..."
                        //  onChange={this.handleClick}
                        multiline={true}
                        rows={3}
                    />
                    <Dropdown
                        placeholder="Select an option"
                        label="Select Importancy of Error !"
                        defaultSelectedKey=""
                        options={options}
                        styles={dropdownStyles}
                    //  onChange={this.handleChange}
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
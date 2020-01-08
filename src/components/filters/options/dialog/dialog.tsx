import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface DialogLargeHeaderProps {
    dialog: boolean;
    dialogOpen: () => void;
    DialogHide: () => void;
}
// Used to add spacing between example checkboxes
const stackTokens: object = { childrenGap: 10 };
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
                    <Stack tokens={stackTokens}>
                        <Checkbox label="important" onChange={this.handleChange} />
                        <Checkbox label="not important" onChange={this.handleChange} />
                    </Stack>

                    <TextField styles={{ root: { marginTop: '30px' } }} label="Comments TextArea..."  multiline={true} rows={3} />
                    <DialogFooter>
                        <PrimaryButton onClick={this.props.DialogHide} text="Save" />
                        <DefaultButton onClick={this.props.DialogHide} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }
    private handleChange = (ev?: React.FormEvent<HTMLElement>, isChecked?: boolean) => {
          console.log(isChecked);
    };

}
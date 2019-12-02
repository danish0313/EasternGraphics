import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets, } from 'office-ui-fabric-react/lib/Styling';

const DayPickerStrings: IDatePickerStrings = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',

    isRequiredErrorMessage: 'Start date is required.',

    invalidInputErrorMessage: 'Invalid date format.'
};

export interface DatePickerInputState {
    firstDayOfWeek?: DayOfWeek;
    value?: Date | null;
}

interface DatePickerInputProps {

    datePickerHandler: (newValue: number) => void;

}

const controlClass = mergeStyleSets({
    control: {
        margin: '0 auto',
        maxWidth: '290px',
        marginBottom: '10px'
    }
});

export default class DatePickerInput extends React.Component<DatePickerInputProps, DatePickerInputState> {
    constructor(props: DatePickerInputProps) {
        super(props);

        this.state = {
            firstDayOfWeek: DayOfWeek.Sunday,
            value: null
        };
    }
    public render(): JSX.Element {
        const { firstDayOfWeek, value } = this.state;
        return (
            <>
                <DatePicker
                    className={controlClass.control}
                    label="Search By DatePicker"
                    isRequired={false}
                    allowTextInput={true}
                    firstDayOfWeek={firstDayOfWeek}
                    strings={DayPickerStrings}
                    value={value!}
                    onSelectDate={this.onSelectDate}
                />
                <DefaultButton onClick={this.onClick} text="Clear" />
            </>
        );
    }
    private onSelectDate = (date: Date | null | undefined): void => {
        if (date == null) {
            return;
        }
        this.setState({ value: date });
        const timeStamp: Date | null | undefined = date;
        const time: number = new Date(timeStamp).getTime();
        this.props.datePickerHandler(time);
    };
    private onClick = (): void => {
        this.setState({ value: null });
    };

}
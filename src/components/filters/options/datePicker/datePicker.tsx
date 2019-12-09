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
    startDate?: Date | null;
    endDate?: Date | null;
}

interface DatePickerInputProps {

    datePickerHandler: (start: number, end: number) => void;

}
interface ProcessedStyleSet {
    control: string;
}
const controlClass: ProcessedStyleSet = mergeStyleSets({
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
            startDate: null,
            endDate: null
        };
    }
    public render(): JSX.Element {
        const { firstDayOfWeek, startDate, endDate } = this.state;
        return (
            <>
                <DatePicker
                    className={controlClass.control}
                    label="Start Date"
                    isRequired={false}
                    allowTextInput={true}
                    firstDayOfWeek={firstDayOfWeek}
                    strings={DayPickerStrings}
                    value={startDate!}
                    onSelectDate={this.startDateSelection}
                />
                <DatePicker
                    className={controlClass.control}
                    label="End Date"
                    isRequired={false}
                    allowTextInput={true}
                    firstDayOfWeek={firstDayOfWeek}
                    strings={DayPickerStrings}
                    value={endDate!}
                    onSelectDate={this.endDateSelection}
                />
                <DefaultButton onClick={this.onClick} text="Clear" />
            </>
        );
    }
    private startDateSelection = (startDate?: Date | null | undefined): void => {
        if (startDate == null) {
            return;
        }
        this.setState({ startDate: startDate });
        const start: Date | null | number = Number(startDate);
        const end: Date | null | number = Number(this.state.endDate);
        this.props.datePickerHandler(start, end);
    };

    private endDateSelection = (endDate: Date | null | undefined): void => {
        if (endDate == null) {
            return;
        }
        this.setState({ endDate: endDate });
        const end: Date | null | number = Number(endDate);
        const start: Date | null | number = Number(this.state.startDate);
        this.props.datePickerHandler(start, end);
    };
    private onClick = (): void => {
        this.setState({ startDate: null, endDate: null });
    };
}
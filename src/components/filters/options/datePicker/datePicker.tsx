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
}

interface DatePickerInputProps {

    handler: (option: string, key: string, value?: string, start?: number, end?: number) => void;
    reset: () => void;
    date: Date | null;

}
interface ProcessedStyleSet {
    control: string;
}
const controlClass: ProcessedStyleSet = mergeStyleSets({
    control: {
        margin: '0 auto',
        maxWidth: '290px',
        marginTop: '20px',

    }
});
export default class DatePickerInput extends React.Component<DatePickerInputProps, DatePickerInputState> {
    private date: Date | null =  this.props.date;
    constructor(props: DatePickerInputProps) {
        super(props);

        this.state = {
            firstDayOfWeek: DayOfWeek.Sunday,
            startDate: null,
        };
    }
    public render(): JSX.Element {

        const { firstDayOfWeek, startDate } = this.state;
        return (
            <>

                <DatePicker
                    className={controlClass.control}
                    label="Search By Date"
                    isRequired={false}
                    allowTextInput={true}
                    firstDayOfWeek={firstDayOfWeek}
                    strings={DayPickerStrings}
                    value={this.date ? this.date : startDate!}
                    onSelectDate={this.startDateSelection}
                />
                <DefaultButton style={{ marginTop: '5px' }} onClick={this.clearHandler} text="Clear" />
            </>
        );
    }
    public componentDidMount = () => {
        if (this.date) {
            const start: Date | null | number = new Date(Number(this.date)).setHours(0, 0, 0);
            const end: Date | null | number = new Date(Number(this.date)).setHours(23, 59, 59);
            this.props.handler('', '', '', start, end);
        }
    };

    private startDateSelection = (startDate: Date | null | undefined): void => {
        if (startDate == null) {
            return;
        }

        this.setState({ startDate: startDate });

        const start: Date | null | number = new Date(Number(startDate)).setHours(0, 0, 0) ;
        const end: Date | null | number = new Date(Number(startDate)).setHours(23, 59, 59) ;

        this.props.handler('', '', '', start, end);
    };
    private clearHandler = () => {
        this.setState({ startDate: null });
        this.date = null;
        this.props.reset();
    };
}
import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import _ from 'lodash';
interface GraphState {
    option: string;
    converted: Array<Result>;
    labels: Array<number>;
}
interface Data {
    name: string;
    color?: string;
    value?: number;
}

interface Result {
    date: number;
    entries: [{
        key: string;
        count: number;

    }];
}

interface Entries {
    key: string;
    count: number;
}

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: {
        width: 250,
        margin: '0 auto',
        paddingBottom: '20px;'
    }
};

// for  css underline
let color: string = '';

class GraphDetails extends React.PureComponent<RouteComponentProps, GraphState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {

            converted: [],
            labels: [],
            option: ''
        };
    }

    public render(): JSX.Element {

        const data: Array<Result> = this.state.converted;
        const converted: Array<Result> = this.convertData(data);
        const labels: Array<string> = this.getLabels(data);
        const stroke: Array<string> = ['#0078D4', 'green', 'brown', 'red', 'darkblue', 'grey', 'black'];

        // CUSTOM Label for Graph
        //    class CustomizedLabel extends React.PureComponent<Label> {
        //       public render(): JSX.Element {
        //           const {
        //               x, y, stroke, value,
        //           } = this.props;

        //          return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
        //       }
        //   }
        // CUSTOM ToolTip for Graph
        class CustomTooltip extends React.PureComponent<any> {
            public render(): JSX.Element | null {
                const { active } = this.props;
                if (active) {
                    const { payload, label } = this.props;
                    return (
                        <div style={{ background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)', width: '15vh', padding: '10px' }}>
                            <div style={{ fontWeight: 'bold' }}>{label} </div>
                            <hr />
                            <div> {payload.filter((x: Data) => x.color === color).map((x: Data) =>
                                <p
                                    key={x.name}
                                    style={{ color: `${x.color}`, fontWeight: 'bold', borderBottom: x.color === color ? '3px double' : 'none' }}
                                >
                                    {x.name}:  {x.value}
                                </p>)}
                            </div>

                        </div>
                    );
                }
                return null;
            }
        }
        return (
            <div>
                <h1 style={{ textAlign: 'center', color: '#605E5C' }}> Graph Details </h1>

                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg8" style={{ textAlign: 'center' }}>
                            <LineChart
                                width={1000}
                                height={700}
                                data={converted}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="5 5" />
                                <XAxis tickFormatter={this.formatXAxis} tickSize={20} dataKey="date" height={60} />
                                <YAxis />
                                <Tooltip
                                    content={<CustomTooltip
                                    />}
                                />
                                <Legend />
                                {labels.map((label, index) => (
                                    <Line
                                        key={index}
                                        dataKey={label}
                                        type="monotone"
                                        strokeWidth={2}
                                        stroke={stroke[index]}
                                        activeDot={{ onClick: this.handleClick, onMouseOver: this.onMouseOver }}
                                        onMouseOver={this.onMouseOver}
                                    />

                                ))}
                            </LineChart>

                        </div>

                        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4" style={{ textAlign: 'center' }}>
                            <Dropdown
                                label="Select Week , Month , Year for Graph"
                                options={[{ key: 'day', text: 'day' },
                                { key: 'week', text: 'week' },
                                { key: 'month', text: 'month' }]}
                                styles={dropdownStyles}
                                onChange={this.GraphHandler}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    public componentDidMount = async () => {
        await this.graphDataApi();
    };
    private convertData = (data: Array<Result>) => {
        const arr: Array<Result> = [];
        for (let i: number = 0; i < data.length; i++) {
            const obj: any = { date: new Date(data[i].date).toLocaleString('en-US').split('/').join('-') };
            // loop through entries
            for (let j: number = 0; j < data[i].entries.length; j++) {
                const entries: Entries = data[i].entries[j];
                obj[entries.key] = entries.count;
            }
            arr.push(obj);
        }
        return arr;
    };
    private getLabels = (data: Array<Result>) => {
        let arr: any = [];
        _.each(data, obj => {
            arr = arr.concat(obj.entries);
        });
        const grouped: _.Dictionary<Array<string>> = _.groupBy(arr, 'key');

        return Object.keys(grouped);
        // return Object.keys(_.groupBy(arr.name));
    };

    private graphDataApi = async () => {

        const response: Response = await fetch(
            'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/histogram/week');
        const data: any = await response.json();

        this.setState(
            {
                converted: data.result
            },
        );
    };
    private formatXAxis = (tickItem: string) => {
        const d: Date = new Date(tickItem);
        if (this.state.option === '') {
            return d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        }
        if (this.state.option === 'week') {

            return d.toLocaleString('default', { weekday: 'short' }) + '-' + (d.toLocaleString('default', { month: 'long' }));
        }
        if (this.state.option === 'day') {
            return d.toLocaleString('default', { weekday: 'short' });
        }
        if (this.state.option === 'month') {

            return d.toLocaleString('default', { month: 'long' }) + '-' + (d.getFullYear());
        }
    };
    private GraphHandler = async (e?: React.FormEvent<HTMLDivElement> | undefined, option?: IDropdownOption | undefined, index?: number | undefined) => {
        if (e == null || option == null) {
            return;
        }
        const text: string = option.text;

        if (text === 'day') {
            const response: Response = await fetch(
                'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/histogram/day');
            const data: any = await response.json();

            this.setState(
                {
                    converted: data.result,
                    option: text
                },
            );
        }
        if (text === 'month') {
            const response: Response = await fetch(
                'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/histogram/month');
            const data: any = await response.json();

            this.setState(
                {
                    converted: data.result,
                    option: text
                },
            );
        }
        if (text === 'week') {
            const response: Response = await fetch(
                'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/histogram/week');
            const data: any = await response.json();

            this.setState(
                {
                    converted: data.result,
                    option: text
                },
            );
        }
    };
    private onMouseOver = (e: any) => {

        color = e.stroke;
    };
    private handleClick = (x: string, y: any) => {

        if (y === null) {
            return;
        }
        const text: string = y.dataKey.toLocaleUpperCase();
        const key: string = y.payload.key;
        const date: number = y.payload.date;
        // console.log(text, key, date);
        this.props.history.push({
            pathname: '/', state: {
                key: key,
                text: text,
                date: date
            }
        });
    };
}
export default withRouter(GraphDetails);
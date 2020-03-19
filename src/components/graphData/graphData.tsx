import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import _ from 'lodash';
interface GraphState {
    option: string;
    converted: Array<Results>;
    labels: Array<number>;
}
interface Data {
    name: string;
    color?: string;
    value?: number;
}
interface Results {
    result: [];
    entries: [];
    date: number;
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
let name: string = '';

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

        const data: Array<Results> = this.state.converted;
        const converted: Array<Results> = this.convertData(data);
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
                            <div> {payload.filter((x: Data) => x.name === name || x.color === color).map((x: Data) =>
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
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ textAlign: 'center', color: '#605E5C' }}> Graph Details </h1>
                <Dropdown
                    label="Select Week , Month , Year for Graph"
                    options={[{ key: 'day', text: 'day' },
                    { key: 'week', text: 'week' },
                    { key: 'month', text: 'month' }]}
                    styles={dropdownStyles}
                    onChange={this.GraphHandler}
                />
                <div style={{ position: 'relative', width: '95%', paddingBottom: '750px' }}>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                        }}
                    >
                        <ResponsiveContainer>
                            <LineChart
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
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>
        );
    }
    public componentDidMount = async () => {
        await this.graphDataApi();
    };
    private convertData = (data: Array<Results>) => {
        const arr: Array<Results> = [];
        for (let i: number = 0; i < data.length; i++) {
            const obj: any = { date: new Date(data[i].date).toLocaleString('en-US').split('/').join('-') };
            // loop through entries
            for (let j: number = 0; j < data[i].entries.length; j++) {
                const entries: Results = data[i].entries[j];
                obj[entries.key] = entries.count;
            }
            arr.push(obj);
        }
        return arr;
    };
    private getLabels = (data: Array<Results>) => {
        let arr: Array<Results> = [];
        _.each(data, obj => {
            arr = arr.concat(obj.entries);
        });
        const grouped: _.Dictionary<Array<Results>> = _.groupBy(arr, 'key');

        return Object.keys(grouped);
        // return Object.keys(_.groupBy(arr.name));
    };

    private graphDataApi = async () => {

        const response: Response = await fetch(
            'http://egrde-tvm-aso1.de.egr.lan:3000/api/v1/histogram/week');
        const data: Results = await response.json();

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
            const data: Results = await response.json();

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
            const data: Results = await response.json();

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
            const data: Results = await response.json();

            this.setState(
                {
                    converted: data.result,
                    option: text
                },
            );
        }
    };
    private onMouseOver = (e: any, y: any) => {

        color = e.stroke || y.fill;
        name = y.dataKey;
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
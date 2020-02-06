import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface GraphState {
    option: string;
}
interface Data {
    name: string;
    info: number;
    warning: number;
    debug: number;
    notice: number;
    error: number;
    config: number;
    fatal: number;
    date: string;
    key: string | number;
    text: string | number;
    stroke: string;
    color?: string;
    value?: number;

}

interface Label {
    stroke?: string;
    value?: number;
    x?: string;
    y?: string;
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
            option: ''
        };
    }

    public render(): JSX.Element {
        const data: Array<Data> = [
            {
                name: 'Mon', date: '10-21-2019', info: 4000, debug: 2400, warning: 2400, error: 300, notice: 700,
                config: 3500, fatal: 2000, key: 'level', text: 'info', stroke: '#0078D4'
            },
            {
                name: 'Tue', date: '10-22-2019', info: 3000, debug: 1398, warning: 250, error: 2000, notice: 900,
                config: 5000, fatal: 4400, key: 'level', text: 'debug', stroke: 'green'
            },
            {
                name: 'Wed', date: '10-23-2019', info: 2000, debug: 9800, warning: 7800, error: 400, notice: 250,
                config: 900, fatal: 100, key: 'level', text: 'warning', stroke: 'brown'
            },
            {
                name: 'Tur', date: '10-24-2019', info: 2780, debug: 3908, warning: 8450, error: 1200, notice: 200,
                config: 2000, fatal: 800, key: 'level', text: 'error', stroke: 'red'
            },
            {
                name: 'Fri', date: '10-25-2019', info: 1890, debug: 4800, warning: 7900, error: 400, notice: 1100,
                config: 200, fatal: 600, key: 'level', text: 'notice', stroke: 'darkblue'
            },
            {
                name: 'Sat', date: '10-26-2019', info: 2390, debug: 3800, warning: 9200, error: 800, notice: 300,
                config: 800, fatal: 1600, key: 'level', text: 'config', stroke: 'grey'
            },
            {
                name: 'Sun', date: '10-27-2019', info: 3490, debug: 4300, warning: 800, error: 1100, notice: 1600,
                config: 200, fatal: 550, key: 'level', text: 'fatal', stroke: 'black'
            },
        ];

        // CUSTOM Label for Graph
        class CustomizedLabel extends React.PureComponent<Label> {
            public render(): JSX.Element {
                const {
                    x, y, stroke, value,
                } = this.props;

                return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
            }
        }

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
                            <div> {payload.filter((x: Data) => x.name === name).map((x: Data) =>
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
                                width={1200}
                                height={650}
                                data={data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="5 5" />
                                <XAxis tickFormatter={this.formatXAxis} tickSize={20} dataKey="date" height={60} />
                                <YAxis />
                                <Tooltip
                                    content={<CustomTooltip
                                    />}

                                />
                                <Legend />
                                {data.map((lines: Data) => (<Line
                                    key={lines.name}
                                    type="monotone"
                                    name={lines.text}
                                    dataKey={lines.text}
                                    stroke={lines.stroke}
                                    label={<CustomizedLabel />}
                                    strokeWidth={2}
                                    activeDot={{ onClick: this.handleClick, onMouseOver: this.onMouseOver }}
                                    onMouseOver={this.onMouseOver}
                                />))}
                            </LineChart>

                        </div>

                        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg4" style={{ textAlign: 'center' }}>
                            <Dropdown
                                label="Select Week , Month , Year for Graph"
                                options={[{ key: 'week', text: 'week' },
                                { key: 'month', text: 'month' },
                                { key: 'year', text: 'year' }]}
                                styles={dropdownStyles}
                                onChange={this.GraphHandler}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    private formatXAxis = (tickItem: string) => {

        const d: Date = new Date(tickItem);
        if (this.state.option === '') {
            return tickItem;
        }
        if (this.state.option === 'week') {

            return d.toLocaleString('default', { weekday: 'long' });
        }
        if (this.state.option === 'month') {

            return ['Jan', 'Feb', 'Mar'];

        }
        if (this.state.option === 'year') {
            return d.toLocaleString('default', { year: 'numeric' });
        }

    };

    private GraphHandler = (e?: React.FormEvent<HTMLDivElement> | undefined, option?: IDropdownOption | undefined, index?: number | undefined): void => {
        if (e == null || option == null) {
            return;
        }
        const text: string = option.text;
        this.setState({

            option: text
        });
    };

    private onMouseOver = (e: any, y: any) => {
        color = e.stroke || y.fill;
        name = e.name || y.dataKey;
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
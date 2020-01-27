import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
    key?: string | number;
    text?: string | number;
}
class GraphDetails extends React.PureComponent<RouteComponentProps> {
    public render(): JSX.Element {
        const data: Array<Data> = [
            {
                name: 'Mon', date: '2012', info: 4000, debug: 2400, warning: 2400, error: 200, notice: 700,
                config: 300, fatal: 100, key: 'level', text: 'INFO',
            },
            {
                name: 'Tue', date: '2012', info: 3000, debug: 1398, warning: 200, error: 500, notice: 300,
                config: 500, fatal: 400, key: 'level', text: 'DEBUG',
            },
            {
                name: 'Wed', date: '2012', info: 2000, debug: 9800, warning: 7800, error: 400, notice: 200,
                config: 900, fatal: 100, key: 'level', text: 'WARNING',
            },
            {
                name: 'Tur', date: '2012', info: 2780, debug: 3908, warning: 8450, error: 700, notice: 600,
                config: 100, fatal: 500, key: 'level', text: 'ERROR',
            },
            {
                name: 'Fri', date: '2012', info: 1890, debug: 4800, warning: 2900, error: 400, notice: 900,
                config: 200, fatal: 800, key: 'level', text: 'NOTICE',
            },
            {
                name: 'Sat', date: '2012', info: 2390, debug: 3800, warning: 1200, error: 800, notice: 300,
                config: 800, fatal: 300, key: 'level', text: 'CONFIG',
            },
            {
                name: 'Sun', date: '2012', info: 3490, debug: 4300, warning: 3400, error: 200, notice: 700,
                config: 500, fatal: 100, key: 'level', text: 'FATAL',
            },
        ];

        return (
            <div>
                <h1 style={{ textAlign: 'center', color: '#605E5C' }}> Graph Details </h1>

                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            onClick={this.handleClick}
                            >
                                <CartesianGrid strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    name="Info"
                                    dataKey="info"
                                    stroke="#8884d8"
                                    activeDot={{ r: 4, onClick: (x: string, y: string) => console.log(x, y) }}
                                />
                                <Line
                                    type="monotone"
                                    name="Warning"
                                    dataKey="warning"
                                    stroke="#605E5C"
                                    activeDot={{ r: 4, onClick: (x: string, y: string) => console.log(x, y) }}
                                />
                                <Line
                                    type="monotone"
                                    name="Debug"
                                    dataKey="debug"
                                    stroke="grey"
                                    activeDot={{ r: 4, onClick: (x: string, y: string) => console.log(x, y) }}
                                />
                                <Line
                                    type="monotone"
                                    name="Error"
                                    dataKey="error"
                                    stroke="red"
                                    activeDot={{ r: 4, onClick: (x: string, y: string) => console.log(x, y) }}
                                />
                                <Line
                                    type="monotone"
                                    name="Notice"
                                    dataKey="notice"
                                    stroke="green"
                                    activeDot={{ r: 4, onClick: (x: string, y: string) => console.log(x, y) }}
                                />
                                <Line
                                    type="monotone"
                                    name="Config"
                                    dataKey="config"
                                    stroke="lightblue"
                                    activeDot={{ r: 4, onClick: (x: string, y: string) => console.log(x, y) }}
                                />
                                <Line
                                    type="monotone"
                                    name="Fatal"
                                    dataKey="fatal"
                                    stroke="pink"
                                    activeDot={{ r: 4, onClick: (x: string, y: string) => console.log(x, y) }}
                                />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleClick = (e: any | undefined) => {
        if (e === null) {
            return;
        }
        const text: string = e.activePayload[0].payload.text.toString();
        const key: string = e.activePayload[0].payload.key.toString();
        this.props.history.push({
            pathname: '/', state: {
                key: key,
                text: text
            }
        });
    };
}
export default withRouter(GraphDetails);
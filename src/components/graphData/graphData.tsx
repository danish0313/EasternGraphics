import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RouteComponentProps, withRouter } from 'react-router-dom';
interface Data {
    name: string;
    pv: number;
    uv: number;
    amt: number;
    key?: string | number;
    text?: string | number;
}
class GraphDetails extends React.PureComponent<RouteComponentProps> {
    public render(): JSX.Element {
        const data: Array<Data> = [
            {
                name: 'Mon', pv: 4000, uv: 2400, amt: 2400, key: 'facility', text: 'GF::eai:eproduct',
            },
            {
                name: 'Tue', pv: 3000, uv: 1398, amt: 200, key: 'facility', text: 'GF::fapish',
            },
            {
                name: 'Wed', pv: 2000, uv: 9800, amt: 7800, key: 'level', text: 'INFO',
            },
            {
                name: 'Tur', pv: 2780, uv: 3908, amt: 8450, key: 'level', text: 'WARNING',
            },
            {
                name: 'Fri', pv: 1890, uv: 4800, amt: 2900, key: 'level', text: 'DEBUG',
            },
            {
                name: 'Sat', pv: 2390, uv: 3800, amt: 1200, key: 'level', text: 'ERROR',
            },
            {
                name: 'Sun', pv: 3490, uv: 4300, amt: 3400, key: 'host', text: 'https://c-live2b.pcon.eu/',
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
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" name="facility" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" name="level" dataKey="uv" stroke="#82ca9d" />
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
        const text: string = [e].map((x) => (x.activePayload[0].payload.text)).toString();
        const key: string = [e].map((x) => (x.activePayload[0].payload.key)).toString();
        this.props.history.push({
            pathname: '/', state: {
                key: key,
                text: text
            }
        });
    };
}
export default withRouter(GraphDetails);
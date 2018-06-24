import React, {Component} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
const data = [
    {name: 'Page A', uv: 4000, pv: 100},
    {name: 'Page B', uv: 3000, pv: 122},
    {name: 'Page C', uv: 2000, pv: 122},
    {name: 'Page D', uv: 1223, pv: 100},
    {name: 'Page E', uv: 1890, pv: 100},
    {name: 'Page F', uv: 2390, pv: 100},
    {name: 'Page G', uv: 3490, pv: 109},
];

class SimpleChart extends React.Component {
    render() {
        return (
            <AreaChart width={600} height={400} data={data}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                {/*<CartesianGrid strokeDasharray="3 3"/>*/}
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8'/>
            </AreaChart>
        )
    }
}
export default SimpleChart;
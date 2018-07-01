import React, {Component} from 'react';
import {mouseEdgeAppearance, macdAppearance } from "../../containers/MainChartContainer/indicatorSettings"
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import {
    macdCalculator,
} from '../../containers/MainChartContainer/indicators';
import {  Chart } from "react-stockcharts";

import {
    MACDSeries,
} from "react-stockcharts/lib/series";
import {
    MACDTooltip,
} from "react-stockcharts/lib/tooltip";
class MACD extends React.Component {
    render() {
        return (
            <Chart id={3} height={150}
                   yExtents={macdCalculator.accessor()}
                   origin={(w, h) => [0, h - 150]} padding={{ top: 10, bottom: 10 }}
            >
                <XAxis axisAt="bottom" orient="bottom"/>
                <YAxis axisAt="right" orient="right" ticks={2} />

                <MouseCoordinateX
                    at="bottom"
                    orient="bottom"
                    displayFormat={timeFormat("%Y-%m-%d")}
                    rectRadius={5}
                    {...mouseEdgeAppearance}
                />
                <MouseCoordinateY
                    at="right"
                    orient="right"
                    displayFormat={format(".2f")}
                    {...mouseEdgeAppearance}
                />

                <MACDSeries yAccessor={d => d.macd}
                            {...macdAppearance} />
                <MACDTooltip
                    origin={[-38, 15]}
                    yAccessor={d => d.macd}
                    options={macdCalculator.options()}
                    appearance={macdAppearance}
                />
            </Chart>
        )
    }
}


export default MACD;

import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {MACD} from "../../components/MainChart";
import { ChartCanvas, Chart } from "react-stockcharts";
import {
    BarSeries,
    AreaSeries,
    CandlestickSeries,
    LineSeries,
    MACDSeries,
    RSISeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    EdgeIndicator,
    CurrentCoordinate,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { elderRay } from 'react-stockcharts/lib/indicator';

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
    OHLCTooltip,
    MovingAverageTooltip,
    MACDTooltip,
    RSITooltip,
    SingleValueTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import {mouseEdgeAppearance, macdAppearance } from "./indicatorSettings"

import {
    ema20,
    sma20,
    ema50,
    tma20,
    ema26,
    ema12,
    atr14,
    smaVolume50,
    wma20,
    bb,
    defaultSar,
    macdCalculator,
    rsiCalculator,
    fullSTO,
    fi,
} from './indicators';

function calculateData(inputData) {
    const elder = elderRay();
    // return smaVolume50(macdCalculator(ema12(ema26(inputData))));
    return ema20(
        wma20(
            tma20(
                sma20(
                    ema50(
                        bb(
                            smaVolume50(
                                macdCalculator(
                                    ema12(ema26(elder(rsiCalculator(fullSTO(fi(defaultSar(atr14(inputData))))))))
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

class CandleStickChartWithMACDIndicator extends React.Component {


    render() {
        const { type, data: initialData, width, ratio } = this.props;



        let calculatedData = calculateData(initialData);

        if (calculatedData.length <= 1) {
            return null;
        }
        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);
        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(calculatedData);

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];

        const theme = {
            greenMint: '#40944e',
            redDesire: '#d62323',
            greenNeon: '#25bb2e',
            redChilli: '#d62323',
            axis: '#fff',
        }
            console.log(width, 'width')
        return (
            <div>
            <ChartCanvas height={600}
                         width={width}
                         ratio={ratio}
                         margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
                         type={type}
                         seriesName="MSFT"
                         data={data}
                         xScale={xScale}
                         xAccessor={xAccessor}
                         displayXAccessor={displayXAccessor}
                         xExtents={xExtents}
            >
                <Chart id={1}
                       height={this.props.chartHeight - this.props.inidcatorHeight}
                       // height={this.props.chartHeight}
                       yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
                       padding={{ top: 10, bottom: 20 }}
                >
                    <XAxis
                        axisAt="bottom"
                        orient="bottom"
                        stroke={theme.axis}
                        fill={theme.axis}
                        showTicks={!this.props.macd && !this.props.rsi}
                        tickStroke={theme.axis}
                        outerTickSize={0}
                    />

                    <YAxis
                        axisAt="right"
                        orient="right"
                        stroke={theme.axis}
                        ticks={10}
                        tickStroke={theme.axis}
                        fill={theme.axis}
                        outerTickSize={0}
                    />

                    <CandlestickSeries
                        fill={d => {
                            return d.close > d.open ? theme.greenMint : theme.redDesire;
                        }}
                        opacity={1}
                        stroke={d => {
                            return d.close > d.open ? theme.greenNeon : theme.redChilli;
                        }}
                        wickStroke={d => {
                            return d.close > d.open ? theme.greenNeon : theme.redChilli;
                        }}
                    />

                    {!this.props.macd && !this.props.rsi &&<MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%Y-%m-%d")}
                        rectRadius={5}
                        {...mouseEdgeAppearance}
                    />}

                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")}
                        {...mouseEdgeAppearance}
                    />

                    {
                        this.props.line &&
                        <div>
                            <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>
                            <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>

                            <CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()} />
                            <CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />
                        </div>
                    }

                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                                   yAccessor={d => d.close}
                                   fill={d => d.close > d.open ? "#A2F5BF" : "#F9ACAA"}
                                   stroke={d => d.close > d.open ? "#0B4228" : "#6A1B19"}
                                   textFill={d => d.close > d.open ? "#0B4228" : "#420806"}
                                   strokeOpacity={1}
                                   strokeWidth={3}
                                   arrowWidth={2}
                    />


                    <OHLCTooltip origin={[-40, 0]}/>

                    <MovingAverageTooltip
                        onClick={e => console.log(e)}
                        origin={[-38, 15]}
                        options={[
                            {
                                yAccessor: ema26.accessor(),
                                type: "EMA",
                                stroke: ema26.stroke(),
                                windowSize: ema26.options().windowSize,
                            },
                            {
                                yAccessor: ema12.accessor(),
                                type: "EMA",
                                stroke: ema12.stroke(),
                                windowSize: ema12.options().windowSize,
                            },
                        ]}
                    />

                </Chart>
                {
                    this.props.volume &&
                    <Chart id={2} height={150}
                           yExtents={[d => d.volume, smaVolume50.accessor()]}
                           origin={(w, h) => [0, h - (150 + this.props.inidcatorHeight)]}
                    >

                        <MouseCoordinateY
                            at="left"
                            orient="left"
                            displayFormat={format(".4s")} />

                        <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
                        <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
                    </Chart>
                }

                {
                    this.props.macd &&
                    <Chart id={3}
                           height={150}
                           yExtents={macdCalculator.accessor()}
                           origin={(w, h) => [0, h - 150]} padding={{ top: 10, bottom: 10 }}
                    >
                        <XAxis axisAt="bottom" orient="bottom"
                               stroke={theme.axis}
                               fill={theme.axis}
                               tickStroke={theme.axis}
                        />
                        <YAxis axisAt="right" orient="right" ticks={2}
                               stroke={theme.axis}
                               fill={theme.axis}
                               tickStroke={theme.axis}
                        />

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

                }
                {
                    this.props.rsi &&

                    <Chart id={3}
                           yExtents={[0, 100]}
                           height={150}
                           origin={(w, h) => [0, h - 150]}
                    >
                        <XAxis axisAt="bottom"
                               stroke={theme.axis}
                               fill={theme.axis}
                               tickStroke={theme.axis}
                               orient="bottom" outerTickSize={0} />

                        <YAxis axisAt="right"
                               orient="right"
                               stroke={theme.axis}
                               fill={theme.axis}
                               tickStroke={theme.axis}
                               tickValues={[30, 50, 70]}/>

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
                            displayFormat={format(".2f")} />

                        <RSISeries yAccessor={d => d.rsi} />

                        <RSITooltip origin={[-38, 15]}
                                    yAccessor={d => d.rsi}
                                    options={rsiCalculator.options()} />
                    </Chart>
                }
                <CrossHairCursor />
            </ChartCanvas>


                {/*<Chart id={1} height={400}*/}
                       {/*yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}*/}
                       {/*padding={{ top: 10, bottom: 20 }}*/}
                {/*>*/}
                    {/*<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />*/}
                    {/*<YAxis axisAt="right" orient="right" ticks={5} />*/}

                    {/*<MouseCoordinateY*/}
                        {/*at="right"*/}
                        {/*orient="right"*/}
                        {/*displayFormat={format(".2f")}*/}
                        {/*{...mouseEdgeAppearance}*/}
                    {/*/>*/}

                    {/*<CandlestickSeries />*/}
                    {/*<LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>*/}
                    {/*<LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>*/}

                    {/*<CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()} />*/}
                    {/*<CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />*/}

                    {/*<EdgeIndicator itemType="last" orient="right" edgeAt="right"*/}
                                   {/*yAccessor={d => d.close}*/}
                                   {/*fill={d => d.close > d.open ? "#A2F5BF" : "#F9ACAA"}*/}
                                   {/*stroke={d => d.close > d.open ? "#0B4228" : "#6A1B19"}*/}
                                   {/*textFill={d => d.close > d.open ? "#0B4228" : "#420806"}*/}
                                   {/*strokeOpacity={1}*/}
                                   {/*strokeWidth={3}*/}
                                   {/*arrowWidth={2}*/}
                    {/*/>*/}

                    {/*<OHLCTooltip origin={[-40, 0]}/>*/}
                    {/*<MovingAverageTooltip*/}
                        {/*onClick={e => console.log(e)}*/}
                        {/*origin={[-38, 15]}*/}
                        {/*options={[*/}
                            {/*{*/}
                                {/*yAccessor: ema26.accessor(),*/}
                                {/*type: "EMA",*/}
                                {/*stroke: ema26.stroke(),*/}
                                {/*windowSize: ema26.options().windowSize,*/}
                            {/*},*/}
                            {/*{*/}
                                {/*yAccessor: ema12.accessor(),*/}
                                {/*type: "EMA",*/}
                                {/*stroke: ema12.stroke(),*/}
                                {/*windowSize: ema12.options().windowSize,*/}
                            {/*},*/}
                        {/*]}*/}
                    {/*/>*/}
                {/*</Chart>*/}
                {/*<Chart id={2} height={150}*/}
                       {/*yExtents={[d => d.volume, smaVolume50.accessor()]}*/}
                       {/*origin={(w, h) => [0, h - 300]}*/}
                {/*>*/}
                    {/*<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>*/}

                    {/*<MouseCoordinateY*/}
                        {/*at="left"*/}
                        {/*orient="left"*/}
                        {/*displayFormat={format(".4s")}*/}
                        {/*{...mouseEdgeAppearance}*/}
                    {/*/>*/}

                    {/*<BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />*/}
                    {/*<AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>*/}
                {/*</Chart>*/}
                {/*<CrossHairCursor />*/}
            {/*</ChartCanvas>*/}
            </div>
        );
    }
}

CandleStickChartWithMACDIndicator.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithMACDIndicator.defaultProps = {
    type: "svg",
};

CandleStickChartWithMACDIndicator = fitWidth(CandleStickChartWithMACDIndicator);

export default CandleStickChartWithMACDIndicator;

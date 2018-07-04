import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData, parseData, parseDate } from "../../utils/services"
import {Loading, StandardSelect, MultiSelect} from "../../components";
import ChartLoadingScreen from "./ChartLoadingScreen";
import { Card, Overlay, Icon, Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";



const timeSpans = [
    { name: '1 min' },
    { name: '5 min' },
    { name: '15 min' },
    { name: '30 min' },
    { name: '1 hr' },
    { name: '4 hr' },
    { name: '12 hr' },
    { name: '1 day' },
    { name: '7 days' },
    { name: '1 month' }
];

const indicators = [
    { name: 'MACD', active: true },
    { name: 'RSI', active: false },
    { name: 'Volume', active: true },
    { name: 'Trendline', active: true },
    { name: 'Reset', active: false }
].map((p, index) => ({...p, rank: index}));

export default class SmallChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            chartHeight: 550,
            inidcatorHeight: 150,
            showIndicatorMenu: false,
            showTimeSpanMenu: false,
            currentTimeSpan: '',
            indicators: indicators,
            timeSpans: timeSpans,
            expandedChard: false
        }
    }

    toogleChartIndicator = (ind) => {
        let indicatorTemp = this.state.indicators[ind.rank];
        indicatorTemp.active = !indicatorTemp.active;
        if(ind.name === "RSI") {
            this.state.indicators[0].active = false;
        }
        else if (ind.name === "MACD") {
            this.state.indicators[1].active = false;
        }
        else if (ind.name === "Reset") {
            this.state.indicators = indicators;
        }
        this.forceUpdate();
        if(this.state.indicators[0].active || this.state.indicators[1].active) {
            this.setState({
                inidcatorHeight: 150
            })
        }
        else {
            this.setState({
                inidcatorHeight: 0
            })
        }
    }
    componentDidMount() {
        const self = this;
        getData().then(data => {
            self.setState({ data: data })
        })

    }
    toogleMenus = (menu) => {
        if(menu === "indicator") {
            this.setState(function (prevState) {
                return {
                    showIndicatorMenu: !prevState.showIndicatorMenu
                }
            })
        }
        else if (menu === "timespan") {
            this.setState(function (prevState) {
                return {
                    showTimeSpanMenu: !prevState.showTimeSpanMenu
                }
            })
        }
    }
    changeTimeSpan = e => {
        this.setState({ currentTimeSpan: e })
    }
    toggleExpand = () => {
        this.setState((prevState) => {
            return {
                expandedChard: !prevState.expandedChard
            }
        })
    }

    render() {
        console.log(this.state);
        return (
            <Card  className="pt-dark main-chart">
                <Toolbar
                    toogleMenus={this.toogleMenus}
                    toggleExpand={this.props.toggleExpand}
                    toogleChartIndicator={this.toogleChartIndicator}
                    changeTimeSpan={this.changeTimeSpan}
                    state={this.state}
                />
                <ChartLoadingScreen
                    macd={this.state.indicators[0].active}
                    rsi={this.state.indicators[1].active}
                    volume={this.state.indicators[2].active}
                    line={this.state.indicators[3].active}
                    inidcatorHeight={this.state.inidcatorHeight}
                    chartHeight={this.state.chartHeight}
                    data={this.state.data}
                />
            </Card>
        )
    }
}

const Toolbar = ({ state, toogleChartIndicator, changeTimeSpan, toogleMenus, toggleExpand }) => (
    <div className="toolbar">
        <div className="menu time-span">
            <StandardSelect
                items={state.timeSpans}
                item={state.currentTimeSpan || timeSpans[0]}
                handleChange={changeTimeSpan}
                icon="series-add"
            />
        </div>
        <div className="menu">
            <MultiSelect
                items={state.indicators}
                item={{name: 'Indicators'}}
                handleChange={toogleChartIndicator}
                icon="series-search"
            />
        </div>
        <div className="menu duration">
            <Icon icon="time"/>
            <Button onClick={toogleMenus("1 hr")} text="1h"/>
            <Button onClick={toogleMenus("6 hr")} text="6h"/>
            <Button onClick={toogleMenus("1 day")} text="1d"/>
            <Button onClick={toogleMenus("3 days")} text="3d"/>
            <Button onClick={toogleMenus("7 days")} text="7d"/>
            <Button onClick={toogleMenus("1 month")} text="1m"/>
            <Button onClick={toogleMenus("3 months")} text="3m"/>
            <Button onClick={toogleMenus("6 months")} text="6m"/>
        </div>
        <Button icon="fullscreen" onClick={toggleExpand}/>
    </div>
)
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData, parseData, parseDate } from "../../utils/services"
import {Loading, StandardSelect, MultiSelect} from "../../components";
import { TypeChooser } from "react-stockcharts/lib/helper";
import ChartComponent from "./ChartContainer";
import { Card, Menu, ContextMenu, Icon, Button, MenuItem, Popover, Position } from "@blueprintjs/core";
// import * as tsvData from "../../jsons/data.tsv";
import { tsvParse } from  "d3-dsv";
import { Select } from "@blueprintjs/select";

const FilmSelect = Select.ofType();

const filterFilm = (query, film) => {
    return film.title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};



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

export default class MainChartContainer extends React.Component {
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
            timeSpans: timeSpans[0]
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


    handleChange = e => {
        this.setState({ currentTimeSpan: e })
    }

    render() {
        console.log(this.state);
        return (
            <Card  className="pt-dark main-chart">

                <div className="toolbar">
                    <div className="menu time-span">
                        <StandardSelect
                            items={timeSpans}
                            item={this.state.currentTimeSpan || timeSpans[0]}
                            handleChange={this.handleChange}
                            icon="series-add"
                        />
                    </div>
                    <div className="menu">
                        <MultiSelect
                            items={this.state.indicators}
                            item={{name: 'Indicators'}}
                            handleChange={this.toogleChartIndicator}
                            icon="series-search"
                        />
                    </div>
                    <div className="menu duration">
                        <Icon icon="time"/>
                        <Button onClick={this.toogleMenus.bind(this, "1 hr")} text="1h"/>
                        <Button onClick={this.toogleMenus.bind(this, "6 hr")} text="6h"/>
                        <Button onClick={this.toogleMenus.bind(this, "1 day")} text="1d"/>
                        <Button onClick={this.toogleMenus.bind(this, "3 days")} text="3d"/>
                        <Button onClick={this.toogleMenus.bind(this, "7 days")} text="7d"/>
                        <Button onClick={this.toogleMenus.bind(this, "1 month")} text="1m"/>
                        <Button onClick={this.toogleMenus.bind(this, "3 months")} text="3m"/>
                        <Button onClick={this.toogleMenus.bind(this, "6 months")} text="6m"/>
                    </div>
                </div>

                <ChartComponent
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

const Toolbar = ({toogleChartIndicator, macd, rsi, line}) => (
    <div className="toolbar">
    </div>
)
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData, parseData, parseDate } from "../../utils/services"
import {Loading} from "../../components";
import { TypeChooser } from "react-stockcharts/lib/helper";
import ChartComponent from "./ChartContainer";
import { Card, Menu, Icon, Button, MenuItem, Popover, Position } from "@blueprintjs/core";
// import * as tsvData from "../../jsons/data.tsv";
import { tsvParse } from  "d3-dsv";

export default class MainChartContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            macd: true,
            rsi: false,
            line: true,
            data: []
        }
    }

    toogleChartIndicator = (val) => {
        console.log(val)
        if(val === "macd") {
            this.setState((prevState) => {
                return {
                    macd: !prevState.macd,
                    rsi: false,
                }
            })
        }
        else if (val === "rsi") {
            this.setState((prevState) => {
                return {
                    rsi: !prevState.rsi,
                    macd: false,
                }
            })
        }
        else if (val === "line") {
            this.setState((prevState) => {
                return {
                    line: !prevState.line
                }
            })
        }
    }
    componentDidMount() {
        const self = this;
        getData().then(data => {
            self.setState({ data: data })
        })
    }
    render() {
        return (
            <Card  className="pt-dark main-chart">
                <Toolbar
                    toogleChartIndicator={this.toogleChartIndicator.bind(this)}
                    macd={this.state.macd}
                    rsi={this.state.rsi}
                    line={this.state.line}
                />
            <div className="chart-container">
                <ChartComponent
                    macd={this.state.macd}
                    rsi={this.state.rsi}
                    line={this.state.line}
                    data={this.state.data}
                />
            </div>
            </Card>
        )
    }
}

const Toolbar = ({toogleChartIndicator, macd, rsi, line}) => (
    <div className="toolbar">
        <Icon icon="timeline-bar-chart" onClick={() => toogleChartIndicator('macd')} className={macd ? "active" : ""}/>
        <Icon icon="timeline-area-chart" onClick={() => toogleChartIndicator('rsi')} className={rsi ? "active" : ""}/>
        <Icon icon="chart" onClick={() => toogleChartIndicator('line')} className={line ? "active" : ""}/>
    </div>
)
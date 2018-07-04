
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "../../utils/services"
import {Loading} from "../../components";
import { TypeChooser } from "react-stockcharts/lib/helper";



export default class ChartComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    render() {
        if (this.props.data.length < 1) {
            return <Loading />
        }
        return (
            <div className="chart-container">
                <TypeChooser>
                    {type => <Chart
                        type={type}
                        macd={this.props.macd}
                        volume={this.props.volume}
                        chartHeight={this.props.chartHeight}
                        inidcatorHeight={this.props.inidcatorHeight}
                        rsi={this.props.rsi}
                        line={this.props.line}
                        data={this.props.data}
                    />}
                </TypeChooser>
            </div>
        )
    }
}


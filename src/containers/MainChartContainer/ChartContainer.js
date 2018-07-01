
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
        this.changeChartPosition = this.changeChartPosition.bind(this);
    }
    componentDidMount() {
        const self = this;

        setTimeout(function () {
            self.changeChartPosition();
        }, 500)
        window.addEventListener("resize", this.changeChartPosition);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.changeChartPosition);
    }

    changeChartPosition = () => {
        setTimeout(function () {
            if(document.getElementsByClassName('react-stockchart')[1]) {
                document.getElementsByClassName('react-stockchart')[1].style.left = 0;
                console.log(document.getElementsByClassName('react-stockchart')[1]);
            }
        }, 10)
    }

    render() {
        if (this.state == null) {
            return <Loading />
        }
        return (
            <TypeChooser>
                {type => <Chart
                    type={type}
                    macd={this.props.macd}
                    rsi={this.props.rsi}
                    line={this.props.line}
                    data={this.props.data}
                />}
            </TypeChooser>
        )
    }
}


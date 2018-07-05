import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { DepthChart, Loading } from "../components";

var AmCharts = require("@amcharts/amcharts3-react");

class DepthChartContainer extends React.Component {

    formatNumber = (val, chart, precision) => {
        return AmCharts.formatNumber(
            val,
            {
                precision: precision ? precision : chart.precision,
                decimalSeparator: chart.decimalSeparator,
                thousandsSeparator: chart.thousandsSeparator
            }
        );
    }

    toolTip = (item, graph) => {
        const self = this;
        var txt;
        if (graph.id == "asks") {
            txt = "Ask: <strong>" + self.formatNumber(item.dataContext.value, graph.chart, 4) + "</strong><br />"
                + "Total volume: <strong>" + self.formatNumber(item.dataContext.askstotalvolume, graph.chart, 4) + "</strong><br />"
                + "Volume: <strong>" + self.formatNumber(item.dataContext.asksvolume, graph.chart, 4) + "</strong>";
        }
        else {
            txt = "Bid: <strong>" + self.formatNumber(item.dataContext.value, graph.chart, 4) + "</strong><br />"
                + "Total volume: <strong>" + self.formatNumber(item.dataContext.bidstotalvolume, graph.chart, 4) + "</strong><br />"
                + "Volume: <strong>" + self.formatNumber(item.dataContext.bidsvolume, graph.chart, 4) + "</strong>";
        }
        return txt;
    }
    render() {
        const {
            props: {
                style, loading, data, title
            },
            toolTip
        } = this;
        return (
            <div style={style} className={loading ? "depth-chart-container loading" : "depth-chart-container"}>
                {
                    loading &&
                        <Loading />
                }
                {
                    !loading &&
                    <DepthChart
                        data={data}
                        title={title}
                        tootlTip={toolTip}
                    />
                }

            </div>
        )
    }
}

DepthChartContainer.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
}
DepthChartContainer.defaultProps = {
    loading: false,
    decimalPoints: 4,
    style: {}
}


export default DepthChartContainer;
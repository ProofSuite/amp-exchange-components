import React, {Component} from 'react';
import SmallChart from "./SmallChart";
import ExtendedChart from "./ExtendedChart";

class MainChartContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedChard: false
        }
    }

    toggleExpand = () => {
        this.setState((prevState) => {
            return {
                expandedChard: !prevState.expandedChard
            }
        })
    }
    render() {
        return (
            <div>
                <SmallChart
                    ohlcvData={this.props.ohlcvData || []}
                    toggleExpand={this.toggleExpand}
                    expandedChard={this.state.expandedChard}
                />
                <ExtendedChart
                    ohlcvData={this.props.ohlcvData || []}
                    expandedChard={this.state.expandedChard}
                    toggleExpand={this.toggleExpand}
                />
            </div>
        )
    }
}

export default MainChartContainer;
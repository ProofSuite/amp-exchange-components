import React, {Component} from 'react';
import SmallChart from "./SmallChart";
import ExtendedChart from "./ExtendedChart";

class MainChartContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedChard: true
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
                    toggleExpand={this.toggleExpand}
                    expandedChard={this.state.expandedChard}
                />
                <ExtendedChart
                    expandedChard={this.state.expandedChard}
                    toggleExpand={this.toggleExpand}
                />
            </div>
        )
    }
}

export default MainChartContainer;
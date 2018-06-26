import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TradeHistory, Loading } from "../components";
import { Icon, Tabs, Tab } from "@blueprintjs/core";

class TradeHistoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabId: 'all'
        }
    }
    changeTab = (tabId) => {
        this.setState({
            selectedTabId: tabId
        })
    }
    render() {
        const self = this;
        return (
            <div style={this.props.style} className="pt-card pt-elevation-1 trade-history order-book">
                <h5>Trade History</h5>
                <Tabs  style={{height: '100%'}} id="TabsExample" selectedTabId={this.state.selectedTabId}  onChange={this.changeTab}>
                    <Tab id="all" title="Market" panel={
                        <TradeHistory
                            loading={this.props.loading}
                            tradeHistory={this.props.tradeHistory}
                            decimalPoints={this.props.decimalPoints}
                        />
                    } />
                    <Tab id="mine" title="Mine"  style={{display: 'flex', alignItems: 'flex-end'}} panel={
                        this.props.loggedIn ?
                            <TradeHistory
                                loading={this.props.loading}
                                tradeHistory={this.props.tradeHistory.slice(40)}
                                decimalPoints={this.props.decimalPoints}
                            />
                            :
                            <Login />
                    } />
                </Tabs>
            </div>

        )
    }
}

TradeHistoryContainer.propTypes = {
    tradeHistory: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    decimalPoints: PropTypes.number,
    loggedIn: PropTypes.bool.isRequired,

}
TradeHistoryContainer.defaultProps = {
    loading: false,
    decimalPoints: 4,
    style: {}
}

export default TradeHistoryContainer;

const Login = () => (
        <button type="button"  style={{width: '100%',padding: '10px'}} className="pt-button pt-intent-primary">Login</button>
)
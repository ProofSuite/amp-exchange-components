import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TradeHistory, Loading } from "../components";
import { Icon, Card, Tabs, Tab } from "@blueprintjs/core";

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
        const {
            props: {
                style, loading, tradeHistory, decimalPoints, loggedIn
            },
            state: {
                selectedTabId
            },
            changeTab
        } = this;
        return (
            <Card style={style} className="pt-dark">
                <div style={style} className=" trade-history order-book">
                    <h5>Trade History</h5>
                    <Tabs  style={{height: '100%'}} id="TabsExample" selectedTabId={selectedTabId}  onChange={changeTab}>
                        <Tab id="all" title="Market" panel={
                            <TradeHistory
                                loading={loading}
                                tradeHistory={tradeHistory}
                                decimalPoints={decimalPoints}
                            />
                        } />
                        <Tab id="mine" title="Mine"  style={{display: 'flex', alignItems: 'flex-end'}} panel={
                            loggedIn ?
                                <TradeHistory
                                    loading={loading}
                                    tradeHistory={tradeHistory.slice(40)}
                                    decimalPoints={decimalPoints}
                                />
                                :
                                <Login />
                        } />
                    </Tabs>
                </div>
            </Card>

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
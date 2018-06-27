import React, {Component} from 'react';
import { DepthChartContainer, OrderBookContainer } from "./index";
import { Icon, Tabs, Tab } from "@blueprintjs/core";

class OrdersStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabId: 'books'
        }
    }
    changeTab = (tabId) => {
        this.setState({
            selectedTabId: tabId
        })
    }
    render() {
        return (
            <div style={this.props.style} className="pt-card order-stats pt-elevation-1">
                <h5>Trade History</h5>
                <Tabs  style={{height: '100%'}} id="TabsExample" selectedTabId={this.state.selectedTabId}  onChange={this.changeTab}>
                    <Tab id="books" title="Market" panel={
                        <OrderBookContainer
                            orderList={this.props.orderList}
                            bookName="Sell"
                            loading={false}
                            currency="ETH"
                            pair="BTC"
                        />
                    } />
                    <Tab id="chart" title="Mine"  style={{display: 'flex', alignItems: 'flex-end'}} panel={
                        <DepthChartContainer
                            data={this.props.bidAsks}
                            loading={false}
                            title="Price (BTC/USDT)"
                        />
                    } />
                </Tabs>
            </div>
        )
    }
}


export default OrdersStats;
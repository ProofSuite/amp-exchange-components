import React, {Component} from 'react';
import { DepthChartContainer, OrderBookContainer } from "./index";
import { Tabs, Tab, Card } from "@blueprintjs/core";
import PropTypes from 'prop-types';

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
        const {
            state: {
                selectedTabId
            },
            props: {
                bidAsk, orderList, style
            },
            changeTab
        } = this;
        return (
            <Card style={style} className="pt-dark order-stats">
            <div style={style}>
                <h5>Order Book</h5>
                <Tabs  style={{height: '100%'}} id="TabsExample" selectedTabId={selectedTabId}  onChange={changeTab}>
                    <Tab id="books" title="List" panel={
                        <OrderBookContainer
                            orderList={orderList}
                            bookName="Sell"
                            loading={false}
                            currency="ETH"
                            pair="BTC"
                        />
                    } />
                    <Tab id="chart" title="Depth"  style={{display: 'flex', alignItems: 'flex-end'}} panel={
                        <DepthChartContainer
                            data={bidAsk}
                            loading={false}
                            title="Price (BTC/USDT)"
                        />
                    } />
                </Tabs>
            </div>
            </Card>
        )
    }
}

OrdersStats.propTypes = {
    orderList: PropTypes.array.isRequired,
    bidAsk: PropTypes.array.isRequired,
    decimalPoints: PropTypes.number,
}
OrdersStats.defaultProps = {
    loading: false,
    decimalPoints: 4,
    style: {}
}

export default OrdersStats;
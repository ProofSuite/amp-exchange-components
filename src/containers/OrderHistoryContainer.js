import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { OrderHistory } from "../components";
import { Button, Card, Tabs, Tab } from "@blueprintjs/core";

class OrderHistoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabId: 'open'
        }
    }
    changeTab = (tabId) => {
        this.setState({
            selectedTabId: tabId
        })
    }
    handleOrderCancel = () => {
        console.log('cancel')
    }
    render() {
        const {
            state: {
                selectedTabId
            },
            props: {
                style, loggedIn, loading, decimalPoints, orderHistory
            },
            changeTab, handleOrderCancel
        } = this;
        return (
            <Card style={style} className="pt-dark">
                <div style={style} className=" trade-history order-history order-book">
                    <h5>Order History</h5>
                    {
                        loggedIn ?
                        <Tabs  style={{height: '100%'}} id="TabsExample" selectedTabId={selectedTabId}  onChange={changeTab}>
                            <Tab id="open" title="Open" panel={
                                <OrderHistory
                                    loading={loading}
                                    orderHistory={orderHistory}
                                    decimalPoints={decimalPoints}
                                    openBook={true}
                                    cancelOrder={handleOrderCancel}
                                />
                            } />
                            <Tab id="complete" title="Completed"  style={{display: 'flex', alignItems: 'flex-end'}} panel={
                                <OrderHistory
                                    loading={loading}
                                    orderHistory={orderHistory.slice(40)}
                                    decimalPoints={decimalPoints}
                                    cancelOrder={handleOrderCancel}
                                    openBook={false}
                                />
                            } />
                        </Tabs>
                            :
                        <Login />
                    }
                </div>
            </Card>

        )
    }
}

OrderHistoryContainer.propTypes = {
    orderHistory: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    decimalPoints: PropTypes.number,
    loggedIn: PropTypes.bool.isRequired,

}
OrderHistoryContainer.defaultProps = {
    loading: false,
    decimalPoints: 4,
    style: {}
}

export default OrderHistoryContainer;

const Login = () => (
        <Button  style={{width: '100%',padding: '10px'}} intent="PRIMARY" text="Login" />
)
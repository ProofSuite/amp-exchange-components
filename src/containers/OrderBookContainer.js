import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { OrderBook } from "../components";

class OrderBookContainer extends React.Component {
    render() {
        const self = this;
        return (
            <div className="row">
                <OrderBook
                    orderList={this.props.orderList}
                    bookName="Sell"
                    loading={this.props.loading}
                    currency={this.props.currency}
                    style={this.props.style}
                    pair={this.props.pair}
                />
                <OrderBook
                    orderList={this.props.orderList}
                    bookName="Buy"
                    loading={this.props.loading}
                    currency={this.props.currency}
                    style={this.props.style}
                    pair={this.props.pair}
                />
            </div>
        )
    }
}

OrderBookContainer.propTypes = {
    bookName: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    decimalPoints: PropTypes.number
}
OrderBookContainer.defaultProps = {
    loading: false,
    decimalPoints: 4,
    style: {}
}


export default OrderBookContainer;
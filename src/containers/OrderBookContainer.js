import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { OrderBook } from "../components";

class OrderBookContainer extends React.Component {
    render() {
        const self = this;
        return (
            <OrderBook
                orderList={this.props.orderList}
                bookName={this.props.bookName}
                loading={this.props.loading}
                currency={this.props.currency}
                pair={this.props.pair}
            />
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
}


export default OrderBookContainer;
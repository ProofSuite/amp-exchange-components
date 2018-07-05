import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { OrderBook } from "../components";

class OrderBookContainer extends React.Component {
    render() {
        const {
            orderList, loading, currency, style, pair
        } = this.props;
        return (
            <div className="row">
                <OrderBook
                    orderList={orderList}
                    bookName="Sell"
                    loading={loading}
                    currency={currency}
                    style={style}
                    pair={pair}
                />
                <OrderBook
                    orderList={orderList}
                    bookName="Buy"
                    loading={loading}
                    currency={currency}
                    style={style}
                    pair={pair}
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
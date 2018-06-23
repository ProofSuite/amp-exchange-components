import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TradeHistory, Loading } from "../components";

class TradeHistoryContainer extends React.Component {
    render() {
        const self = this;
        return (
            <TradeHistory
                loading={this.props.loading}
                tradeHistory={this.props.tradeHistory}
                decimalPoints={this.props.decimalPoints}
            />
        )
    }
}

TradeHistoryContainer.propTypes = {
    tradeHistory: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    decimalPoints: PropTypes.number
}
TradeHistoryContainer.defaultProps = {
    loading: false,
    decimalPoints: 4,
}

export default TradeHistoryContainer;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { boundDecimal } from "../utils/services";
import { Loading } from "./index";

class TradeHistory extends React.Component {
    render() {
        const self = this;
        return (
                        this.props.loading ?
                            <Loading height="100%" />
                            :
                            <HistroyList
                                tradeHistory={this.props.tradeHistory}
                                decimalPoints={this.props.decimalPoints}
                            />
        )
    }
}

TradeHistory.propTypes = {
    tradeHistory: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    decimalPoints: PropTypes.number
}
TradeHistory.defaultProps = {
    loading: false,
    decimalPoints: 4,
}

export default TradeHistory;


const HistroyList = ({tradeHistory, decimalPoints}) => (
    <div className="list-container pt-dark" style={{height: '100%'}}>
        {console.log(tradeHistory, decimalPoints)}
        <ul className="pt-list-unstyled">
            <li className="heading" style={{margin: '10px auto'}}>
                <span className="index">#</span>
                <span className="time">Time</span>
                <span className="type">Type</span>
                <span className="amount">Amount</span>
                <span className="price">Price</span>
            </li>
            {
                tradeHistory
                    .sort((a, b) => a.time < b.time)
                    .map((order, index) =>
                        <Row
                            key={index}
                            props={{order, decimalPoints: decimalPoints, index}}
                        />)
            }
        </ul>
    </div>
);

const Row = ({props}) => (
    <li className="not-heading">
        <span className="index">{props.index+1}</span>
        <span className="time">
            {new Date(props.order.time).toLocaleDateString().replace(/\//g, '-')}
        </span>
        <span className="type" style={props.order.type === "sell" ? {color: '#f75535'} : {color: '#00a45b'}}>
            {props.order.type}
        </span>
        <span className="amount">
            {boundDecimal(props.order.amount, props.decimalPoints)}
        </span >
        <span className="price">
            {boundDecimal(props.order.price, props.decimalPoints)}
        </span>
    </li>
);
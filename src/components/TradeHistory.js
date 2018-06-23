import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { boundDecimal } from "../utils/services";
import { Loading } from "./index";

class TradeHistory extends React.Component {
    render() {
        const self = this;
        return (
            <div className="trade-history order-book">
                <div className="pt-card pt-elevation-1 pt-dark">
                    <h5 style={{borderBottom: '1px solid #a7a7a7', paddingBottom: '7px'}}>Trade History</h5>
                    {
                        this.props.loading &&
                        <Loading />
                    }
                    {
                        !this.props.loading &&
                        <div className="list-container">
                            <ul className="pt-list-unstyled">
                                <li className="heading" style={{margin: '10px auto'}}>
                                    <span className="index">#</span>
                                    <span className="time">Time</span>
                                    <span className="type">Type</span>
                                    <span className="amount">Amount</span>
                                    <span className="price">Price</span>
                                </li>
                                {
                                    this.props.tradeHistory
                                        .sort((a, b) => a.time < b.time)
                                        .map((order, index) =>
                                            <Row
                                                key={index}
                                                props={{order, decimalPoints: self.props.decimalPoints, index}}
                                            />)
                                }
                            </ul>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

TradeHistory.propTypes = {
    bookName: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    decimalPoints: PropTypes.number
}
TradeHistory.defaultProps = {
    loading: false,
    decimalPoints: 4,
}

export default TradeHistory;


const Row = (props) => (

    <li className="not-heading">
        <span className="index">{props.props.index+1}</span>
        <span className="time">
            {new Date(props.props.order.time).toLocaleDateString().replace(/\//g, '-')}
        </span>
        <span className="type" style={props.props.order.type === "sell" ? {color: '#f75535'} : {color: '#00a45b'}}>
            {props.props.order.type}
        </span>
        <span className="amount">
            {boundDecimal(props.props.order.amount, props.props.decimalPoints)}
        </span >
        <span className="price">
            {boundDecimal(props.props.order.price, props.props.decimalPoints)}
        </span>
    </li>
);
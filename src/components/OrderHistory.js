import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { boundDecimal } from "../utils/services";
import { Loading } from "./index";
import { Icon, Colors } from "@blueprintjs/core";

class OrderHistory extends React.Component {
    render() {
        const {
            orderHistory, decimalPoints, cancelOrder, openBook,
            loading
        } = this.props;
        return (
                            loading ?
                                <Loading height="100%" />
                                :
                                <HistroyList
                                    orderHistory={orderHistory}
                                    decimalPoints={decimalPoints}
                                    cancelOrder={cancelOrder}
                                    openBook={openBook}
                                />
        )
    }
}

OrderHistory.propTypes = {
    orderHistory: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    decimalPoints: PropTypes.number
}
OrderHistory.defaultProps = {
    loading: false,
    decimalPoints: 4,
}

export default OrderHistory;


const HistroyList = ({orderHistory, decimalPoints, openBook, cancelOrder}) => (
    <div className="list-container pt-dark" style={{height: '100%'}}>
        <ul className="pt-list-unstyled">
            <li className="heading" >
                <span className="index">#</span>
                <span className="amount">Pair</span>
                <span className="type">Type</span>
                <span className="amount">Amount</span>
                <span className="price">Price</span>
                <span className="time">Time</span>
                {openBook && <span className="index">Cancel</span>}
            </li>
        </ul>
        <ul className="pt-list-unstyled list">
            {
                orderHistory
                    .sort((a, b) => a.time < b.time)
                    .map((order, index) =>
                        <Row
                            key={index}
                            props={{order, decimalPoints: decimalPoints, index, openBook, cancelOrder }}
                        />)
            }
        </ul>
    </div>
);

const Row = ({props}) => (
    <li className="not-heading">
        <span className="index">{props.index+1}</span>
        <span className="amount">{props.order.pair}</span>
        <span className="type" style={props.order.type === "sell" ? {color: Colors.RED4} : {color: Colors.GREEN5}}>
            {props.order.type}
        </span>
        <span className="amount">
            {boundDecimal(props.order.amount, props.decimalPoints)}
        </span >
        <span className="price">
            {boundDecimal(props.order.price, props.decimalPoints)}
        </span>
        <span className="time">
            {new Date(props.order.time).toLocaleDateString().replace(/\//g, '-')}
        </span>
        {
            props.openBook &&
            <span className="index close">
                <Icon icon="cross" onClick={props.cancelOrder} />
            </span>
        }
    </li>
);
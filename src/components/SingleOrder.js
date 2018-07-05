import React, {Component} from 'react';
import {boundDecimal} from "../utils/services";
import PropTypes from 'prop-types';

class SingleOrder extends React.Component {
    render() {
        const {
            order, index, decimalPoints
        } = this.props;
        return (
            <li className="not-heading">
                <span className="index">{index+1}</span>
                <span className="total">
                    {boundDecimal(parseFloat(order.amount) * parseFloat(order.price), decimalPoints)}
                </span>
                <span  className="amount">
                    {boundDecimal(order.amount, decimalPoints)}
                </span>
                <span className="price">
                    {boundDecimal(order.price, decimalPoints)}
                </span>
            </li>
        )
    }
}

SingleOrder.propTypes = {
    order: PropTypes.object.isRequired
}

export default SingleOrder;
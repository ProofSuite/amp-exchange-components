import React, {Component} from 'react';
import {boundDecimal} from "../utils/services";
import PropTypes from 'prop-types';

class SingleOrder extends React.Component {
    render() {
        const order = this.props.order;
        return (
            <li className="not-heading">
                <span style={{width: 'auto'}}>{this.props.index+1}</span>
                <span>
                    {boundDecimal(parseFloat(order.amount) * parseFloat(order.price), this.props.decimalPoints)}
                </span>
                <span>
                    {boundDecimal(order.amount, this.props.decimalPoints)}
                </span>
                <span className="price">
                    {boundDecimal(order.price, this.props.decimalPoints)}
                </span>
            </li>
        )
    }
}

SingleOrder.propTypes = {
    order: PropTypes.object.isRequired
}

export default SingleOrder;
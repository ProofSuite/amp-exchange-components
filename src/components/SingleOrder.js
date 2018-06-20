import React, {Component} from 'react';

class SingleOrder extends React.Component {
    render() {
        const order = this.props.order;
        return (
            <li className="not-heading">
                <span>
                    {Math.floor(parseFloat(order.amount) * parseFloat(order.price) * Math.pow(10, this.props.decimalPoints)) / Math.pow(10, this.props.decimalPoints)}
                </span>
                <span>
                    {Math.floor(order.amount * Math.pow(10, this.props.decimalPoints)) / Math.pow(10, this.props.decimalPoints)}
                </span>
                <span className="price">
                    {Math.floor(order.price * Math.pow(10, this.props.decimalPoints)) / Math.pow(10, this.props.decimalPoints)}
                </span>
            </li>
        )
    }
}

SingleOrder.propTypes = {
    //myProps = React.PropTypes.string.isRequired
}

export default SingleOrder;
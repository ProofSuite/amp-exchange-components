import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SingleOrder from "./SingleOrder";

class OrderBook extends React.Component {
    render() {
        const self = this;
        return (
            <div className={this.props.bookName + " order-book"}>
                <div className="pt-card pt-elevation-1 pt-dark">
                    <h5 style={{borderBottom: '1px solid #a7a7a7', paddingBottom: '7px'}}>{this.props.bookName}</h5>
                    {
                        this.props.loading &&
                        <div className="loading-overlay">
                            <div className="pt-spinner .pt-large">
                                <div className="pt-spinner-svg-container">
                                    <svg viewBox="0 0 100 100">
                                        <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                                        <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !this.props.loading &&
                        <div className="list-container">
                            <ul className="pt-list-unstyled">
                                <li className="heading" style={{display: 'flex', justifyContent: 'space-between', margin: '10px auto'}}>
                                    <span style={{width: 'auto'}}>#</span>
                                    <span>Total ({this.props.pair})</span>
                                    <span>Amount ({this.props.currency})</span>
                                    <span>Price ({this.props.pair})</span>
                                </li>
                                {
                                    [].concat(this.props.orderList.list)
                                        .sort((a, b) => a.price < b.price)
                                        .map((order, index) =>
                                            <SingleOrder
                                                decimalPoints={self.props.decimalPoints}
                                                key={index}
                                                index={index}
                                                order={order}
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

OrderBook.propTypes = {
    bookName: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    decimalPoints: PropTypes.number
}
OrderBook.defaultProps = {
    loading: false,
    decimalPoints: 4,
}

export default OrderBook;
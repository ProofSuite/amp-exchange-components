import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SingleOrder from "./SingleOrder";
import { Loading } from "./index";
import { Card } from "@blueprintjs/core";

class OrderBook extends React.Component {
    render() {
        const self = this;
        return (
               <div style={this.props.style} className={this.props.bookName + " order-book"}>
                   <div className="inner pt-dark">
                       <h5 >{this.props.bookName}</h5>
                       {
                           this.props.loading &&
                           <Loading />
                       }
                       {
                           !this.props.loading &&
                           <div className="list-container" style={{height: '90%'}}>
                               <ul className="pt-list-unstyled">
                                   <li className="heading">
                                       <span  className="index">#</span>
                                       <span  className="total">Total ({this.props.pair})</span>
                                       <span  className="amount">Amount ({this.props.currency})</span>
                                       <span  className="price" style={{color: "#fff"}}>Price ({this.props.pair})</span>
                                   </li>
                               </ul>
                               <ul className="pt-list-unstyled list" style={{height: '90%'}}>
                                   {
                                       [].concat(this.props.orderList)
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
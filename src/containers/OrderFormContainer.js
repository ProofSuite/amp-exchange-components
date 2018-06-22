import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { OrderForm } from "../components";
class OrderFormContainer extends React.Component {
    constructor(props){
        super(props);
        this.textInput = React.createRef();
        this.state = {
            portion: 0,
            priceType: 'null',
            price: 0,
            amount: 0,
            total: 0
        }
    }
    handlePortion = (e) => {
        let portion = parseInt(e.target.value);
        let amount;
        if(this.props.formName === "Sell") {
            amount = this.props.totalCurrBalance / 100 * portion;
            let total = this.state.price * amount;
            this.setState({
                portion: portion,
                amount: Math.floor(amount * Math.pow(10, 7)) / Math.pow(10, 7),
                total: Math.floor(total * Math.pow(10, 7)) / Math.pow(10, 7)
            })
        }
        else {
            let total = this.props.totalPairBalance / 100 * portion;
            amount = total/this.state.price;
            this.setState({
                portion: portion,
                amount: Math.floor(amount * Math.pow(10, 7)) / Math.pow(10, 7),
                total: Math.floor(total * Math.pow(10, 7)) / Math.pow(10, 7)
            })
        }
        console.log(this.state)
    }
    handlePriceChange = (e) => {
        let total = this.state.amount * e.target.value;
        this.setState({
            total: Math.floor(total * Math.pow(10, 7)) / Math.pow(10, 7),
            price: e.target.value
        })
        console.log(this.state)
    }
    handleAmountChange = (e) => {
        let total = this.state.price * e.target.value;
        this.setState({
            total: Math.floor(total * Math.pow(10, 7)) / Math.pow(10, 7),
            amount: e.target.value
        })
    }
    handleTotalChange = (e) => {
        let amount = e.target.value / this.state.price;
        amount = Math.floor(amount * Math.pow(10, 7)) / Math.pow(10, 7)
        this.setState({
            amount: Math.floor(amount * Math.pow(10, 7)) / Math.pow(10, 7),
            total: e.target.value
        })
    }
    handlePriceType = (e) => {
        if(e.target.value === "Bid") {
            this.handlePriceChange({target: {value: this.props.bidPrice}})
        }
        else {
            this.handlePriceChange({target: {value: this.props.askPrice}})
        }
        console.log(e.target.value)
        this.setState({
            priceType: e.target.value
        })
    }
    resetRadios = (val) => {
        if(val === "priceType"){
            this.setState({priceType: ''});
        }
        else {
            this.setState({portion: 0})
        }
    }
    render() {
        return (
            <OrderForm
                askPrice={this.props.askPrice}
                bidPrice={this.props.bidPrice}
                totalCurrBalance={this.props.totalCurrBalance}
                totalPairBalance={this.props.totalPairBalance}
                formName={this.props.formName}
                currency={this.props.currency}
                pair={this.props.pair}
                loggedIn={this.props.loggedIn}
                state={this.state}
                handlePriceType={this.handlePriceType}
                handlePriceChange={this.handlePriceChange}
                handlePortion={this.handlePortion}
                handleTotalChange={this.handleTotalChange}
                handleAmountChange={this.handleAmountChange}
                resetRadios={this.resetRadios}
            />
        )
    }
}

OrderFormContainer.propTypes = {
    askPrice: PropTypes.number.isRequired,
    bidPrice: PropTypes.number.isRequired,
    totalCurrBalance: PropTypes.number.isRequired,
    totalPairBalance: PropTypes.number.isRequired,
    formName: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    pair: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired
}
OrderFormContainer.defaultProps = {
    decimalPoints: 7
}


export default OrderFormContainer;
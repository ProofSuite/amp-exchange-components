import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { OrderForm } from "../components";
import { Icon, Card, Tabs, Tab } from "@blueprintjs/core";

class OrderFormContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            portion: 0,
            priceType: 'null',
            selectedTabId: 'limit',
            price: 0,
            stopPrice: 0,
            limitPrice: 0,
            amount: 0,
            total: 0
        }
    }
    componentDidMount() {
        if(this.props.formName === "Buy") {
            this.setState({
                price: this.props.askPrice
            })
        }
        else {
            this.setState({
                price: this.props.bidPrice
            })
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
    handleLimitPriceChange = (e) => {
        let total = this.state.amount * e.target.value;
        this.setState({
            // total: Math.floor(total * Math.pow(10, 7)) / Math.pow(10, 7),
            limitPrice: e.target.value
        })
    }
    handleStopPriceChange = (e) => {
        console.log(e)
        let total = this.state.amount * e.target.value;
        this.setState({
            total: Math.floor(total * Math.pow(10, 7)) / Math.pow(10, 7),
            stopPrice: e.target.value
        })
    }
    handleAmountChange = (e) => {
        let total;
        if(this.state.selectedTabId === "stop") {
            total = this.state.stopPrice * e.target.value;
        }
        else {
            total = this.state.price * e.target.value;
        }
        this.setState({
            total: Math.floor(total * Math.pow(10, 7)) / Math.pow(10, 7),
            amount: e.target.value
        })
    }
    handleTotalChange = (e) => {
        let amount;
        if(this.state.selectedTabId === "stop") {
            amount = e.target.value / this.state.stopPrice;
        }
        else {
            amount = e.target.value / this.state.price;
        }
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
    resetRadios = () => {
        this.setState({portion: 0})
    }
    changeTab = (tabId) => {
        this.setState({
            selectedTabId: tabId,
            portion: 0,
            priceType: 'null',
            price: 0,
            stopPrice: 0,
            limitPrice: 0,
            amount: 0,
            total: 0
        })
        console.log(tabId)
        if(tabId === "limit" && this.props.formName === "Buy") {
            this.setState({
                price: this.props.askPrice
            })
        }
        else if(tabId === "limit") {
            this.setState({
                price: this.props.bidPrice
            })
        }
    }
    onInputChange = (props) => {
        switch (props.target) {
            case "stopPrice":
                this.handleStopPriceChange(props.evt);
                break;

            case "limitPrice":
                this.handleLimitPriceChange(props.evt);
                break;

            case "price":
                this.handlePriceChange(props.evt);
                break;

            case "total":
                this.handleTotalChange(props.evt);
                break;

            case "amount":
                this.handleAmountChange(props.evt);
                break;

            case "portion":
                this.handlePortion(props.evt);
                break;

            case "radio":
                this.resetRadios(props.evt);
                break;
        }
    }
    render() {
        const {
            props: {
                style, formName, currency, selectedTabId, loggedIn, pair
            },
            onInputChange, changeTab
        } = this;
        return (
            <Card style={style} className="pt-dark order-form">
                <h5 >{formName} {currency}</h5>
                <Tabs id="TabsExample" selectedTabId={selectedTabId}  onChange={changeTab}>
                    <Tab id="limit" title="Limit" panel={
                        <OrderForm
                            formName={formName}
                            currency={currency}
                            pair={pair}
                            loggedIn={loggedIn}
                            state={this.state}
                            onInputChange={onInputChange}
                        />
                    } />
                    <Tab id="stop" title="Stop Limit" panel={
                        <OrderForm
                            formName={formName}
                            currency={currency}
                            pair={pair}
                            loggedIn={loggedIn}
                            state={this.state}
                            onInputChange={onInputChange}
                        />
                    } />
                </Tabs>
            </Card>
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
    decimalPoints: 7,
    style: {}
}

export default OrderFormContainer;
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OrderForm extends React.Component {
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
    render() {
        return (
            <div style={{textAlign: 'center', width: '250px', overflowY: 'scroll'}} className="pt-card pt-elevation-1 pt-dark order-form">
                <h5 style={{borderBottom: '1px solid #a7a7a7', paddingBottom: '7px'}}>{this.props.formName} {this.props.currency}</h5>

                <form>
                    <label className="pt-label default">
                        Price
                        <div className="pt-input-group">
                            <input onKeyPress={() => this.setState({priceType: ''})} onChange={this.handlePriceChange} value={this.state.price} min="0" className="pt-input"  type="number" placeholder="Input group" dir="auto" />
                            <span className="curr-name">{this.props.pair}</span>
                        </div>

                        <div className="pt-input-group radio-buttons">
                            <label className={this.state.priceType === 'Bid' ? "box active-box" : "box"}>
                                Bid
                                <input type="radio" onChange={this.handlePriceType.bind(this)} value="Bid" checked={this.state.priceType === 'Bid'} />
                            </label>
                            <label className={this.state.priceType === 'Ask' ? "box active-box" : "box"}>
                                Ask
                                <input type="radio" onChange={this.handlePriceType.bind(this)} value="Ask" checked={this.state.priceType === 'Ask'} />
                            </label>
                        </div>
                    </label>
                    <label className="pt-label default">
                        Amount
                        <div className="pt-input-group">
                            <input  onKeyPress={() => this.setState({portion: 0})} onChange={this.handleAmountChange} value={this.state.amount} min="0" className="pt-input"  type="number" placeholder="Input group" dir="auto" />
                            <span className="curr-name">{this.props.currency}</span>
                        </div>
                    </label>
                    <label className="pt-label default">
                        Portion
                        <div className="pt-input-group radio-buttons">
                            <label className={this.state.portion === 25 ? "box active-box" : "box"}>
                                25%
                                <input type="radio" onChange={this.handlePortion.bind(this)} value={25} checked={this.state.portion === 25} />
                            </label>
                            <label className={this.state.portion === 50 ? "box active-box" : "box"}>
                                50%
                                <input type="radio" onChange={this.handlePortion.bind(this)} value={50} checked={this.state.portion === 50} />
                            </label>
                            <label className={this.state.portion === 75 ? "box active-box" : "box"}>
                                75%
                                <input type="radio" onChange={this.handlePortion.bind(this)} value={75} checked={this.state.portion === 75} />
                            </label>
                            <label className={this.state.portion === 100 ? "box active-box" : "box"}>
                                100%
                                <input type="radio" onChange={this.handlePortion.bind(this)} value={100} checked={this.state.portion === 100} />
                            </label>
                        </div>
                    </label>
                    <label className="pt-label default">
                        Total
                        <div className="pt-input-group">
                            <input onKeyPress={() => this.setState({portion: 0})} min="0" onChange={this.handleTotalChange} value={this.state.total} className="pt-input" type="number" placeholder="Input group" dir="auto" />
                            <span className="curr-name">{this.props.pair}</span>
                        </div>
                    </label>
                    {
                        this.props.loggedIn &&
                        <button className="pt-button pt-large pt-intent-primary">{this.props.formName}</button>
                    }
                    {
                        !this.props.loggedIn &&
                        <button className="pt-button pt-large pt-intent-primary">Login</button>
                    }
                </form>

            </div>
        )
    }
}

OrderForm.propTypes = {
    askPrice: PropTypes.number.isRequired,
    bidPrice: PropTypes.number.isRequired,
    totalCurrBalance: PropTypes.number.isRequired,
    totalPairBalance: PropTypes.number.isRequired,
    formName: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    pair: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired
}
OrderForm.defaultProps = {
    decimalPoints: 7
}

export default OrderForm;
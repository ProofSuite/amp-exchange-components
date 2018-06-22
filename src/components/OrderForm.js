import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OrderForm extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center', width: '250px'}} className="pt-card pt-elevation-1 pt-dark order-form">
                <h5 style={{borderBottom: '1px solid #a7a7a7', paddingBottom: '7px'}}>{this.props.formName} {this.props.currency}</h5>

                <form>
                    <label className="pt-label default">
                        Price
                        <div className="pt-input-group">
                            <input onKeyPress={() => this.props.resetRadios('priceType')} onChange={this.props.handlePriceChange} value={this.props.state.price} min="0" className="pt-input"  type="number" placeholder="Input group" dir="auto" />
                            <span className="curr-name">{this.props.pair}</span>
                        </div>

                        <div className="pt-input-group radio-buttons">
                            <label className={this.props.state.priceType === 'Bid' ? "box active-box" : "box"}>
                                Bid
                                <input type="radio" onChange={this.props.handlePriceType} value="Bid" checked={this.props.state.priceType === 'Bid'} />
                            </label>
                            <label className={this.props.state.priceType === 'Ask' ? "box active-box" : "box"}>
                                Ask
                                <input type="radio" onChange={this.props.handlePriceType} value="Ask" checked={this.props.state.priceType === 'Ask'} />
                            </label>
                        </div>
                    </label>
                    <label className="pt-label default">
                        Amount
                        <div className="pt-input-group">
                            <input  onKeyPress={() => this.props.resetRadios('portion')} onChange={this.props.handleAmountChange} value={this.props.state.amount} min="0" className="pt-input"  type="number" placeholder="Input group" dir="auto" />
                            <span className="curr-name">{this.props.currency}</span>
                        </div>
                    </label>
                    <label className="pt-label default">
                        Portion
                        <div className="pt-input-group radio-buttons">
                            <label className={this.props.state.portion === 25 ? "box active-box" : "box"}>
                                25%
                                <input type="radio" onChange={this.props.handlePortion} value={25} checked={this.props.state.portion === 25} />
                            </label>
                            <label className={this.props.state.portion === 50 ? "box active-box" : "box"}>
                                50%
                                <input type="radio" onChange={this.props.handlePortion} value={50} checked={this.props.state.portion === 50} />
                            </label>
                            <label className={this.props.state.portion === 75 ? "box active-box" : "box"}>
                                75%
                                <input type="radio" onChange={this.props.handlePortion} value={75} checked={this.props.state.portion === 75} />
                            </label>
                            <label className={this.props.state.portion === 100 ? "box active-box" : "box"}>
                                100%
                                <input type="radio" onChange={this.props.handlePortion} value={100} checked={this.props.state.portion === 100} />
                            </label>
                        </div>
                    </label>
                    <label className="pt-label default">
                        Total
                        <div className="pt-input-group">
                            <input onKeyPress={() => this.props.resetRadios('portion')} min="0" onChange={this.props.handleTotalChange} value={this.props.state.total} className="pt-input" type="number" placeholder="Input group" dir="auto" />
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
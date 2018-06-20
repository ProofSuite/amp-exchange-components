import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OrderForm extends React.Component {
    constructor(props){
        super(props);
        this.textInput = React.createRef();
        this.state = {
            selectedOption: '0',
            price: 0,
            amount: 0,
            total: 0
        }
    }
    handleRadio = (e) => {
        console.log(e.target)
        let amount = this.props.totalBalance / 100 * parseFloat(e.target.value);
        let total = this.state.price * amount;
        this.setState({
            selectedOption: e.target.value,
            amount: amount,
            total: total
        })

    }
    handlePriceChange = (e) => {
        let total = this.state.amount * e.target.value;
        this.setState({
            total: total,
            price: e.target.value
        })
    }
    handleAmountChange = (e) => {
        let total = this.state.price * e.target.value;
        this.setState({
            total: total,
            amount: e.target.value
        })
    }
    handleTotalChange = (e) => {
        let amount = e.target.value / this.state.price;
        amount = Math.floor(amount * Math.pow(10, 7)) / Math.pow(10, 7)
        this.setState({
            amount: amount,
            total: e.target.value
        })
    }
    render() {
        return (
            <div style={{textAlign: 'center', width: '250px', height: '400px', overflowY: 'scroll'}} className="pt-card pt-elevation-1 pt-dark">
                <h5 style={{borderBottom: '1px solid #a7a7a7', paddingBottom: '7px'}}>{this.props.formName} {this.props.currency}</h5>

                <form>
                    <label style={{textAlign: 'left'}} className="pt-label default">
                        Price
                        <div className="pt-input-group">
                            <input onChange={this.handlePriceChange} value={this.state.price} min="0" className="pt-input"  type="number" placeholder="Input group" dir="auto" />
                            <span className="curr-name">{this.props.pair}</span>
                        </div>
                    </label>
                    <label style={{textAlign: 'left'}} className="pt-label default">
                        Amount
                        <div className="pt-input-group">
                            <input onChange={this.handleAmountChange} value={this.state.amount} min="0" className="pt-input"  type="number" placeholder="Input group" dir="auto" />
                            <span className="curr-name">{this.props.currency}</span>
                        </div>
                    </label>
                    <label style={{textAlign: 'left'}} className="pt-label default portion">
                        Portion
                        <div className="pt-input-group" style={{display: 'flex'}}>
                            <label style={this.state.selectedOption === '25' ? {backgroundColor: '#6f767b'} : {}} className="box">
                                25%
                                <input type="radio" onChange={this.handleRadio.bind(this)} value="25" checked={this.state.selectedOption === '25'} />
                            </label>
                            <label style={this.state.selectedOption === '50' ? {backgroundColor: '#6f767b'} : {}} className="box">
                                50%
                                <input type="radio" onChange={this.handleRadio.bind(this)} value="50" checked={this.state.selectedOption === '50'} />
                            </label>
                            <label style={this.state.selectedOption === '75' ? {backgroundColor: '#6f767b'} : {}} className="box">
                                75%
                                <input type="radio" onChange={this.handleRadio.bind(this)} value="75" checked={this.state.selectedOption === '75'} />
                            </label>
                            <label style={this.state.selectedOption === '100' ? {backgroundColor: '#6f767b'} : {}} className="box">
                                100%
                                <input type="radio" onChange={this.handleRadio.bind(this)} value="100" checked={this.state.selectedOption === '100'} />
                            </label>
                        </div>
                    </label>
                    <label style={{textAlign: 'left'}} className="pt-label default">
                        Total
                        <div className="pt-input-group">
                            <input min="0" onChange={this.handleTotalChange} value={this.state.total} className="pt-input"  type="number" placeholder="Input group" dir="auto" />
                            <span className="curr-name">{this.props.pair}</span>
                        </div>
                    </label>
                </form>

            </div>
        )
    }
}

OrderForm.propTypes = {
    //myProps = React.PropTypes.string.isRequired
}

export default OrderForm;
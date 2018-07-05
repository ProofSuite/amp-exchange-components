import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Intent, Spinner, Label, FormGroup } from "@blueprintjs/core";

class OrderForm extends React.Component {
    render() {
        const {
            state, pair, onInputChange, loggedIn, formName, currency
        } = this.props;
        return (
            <div>
                {
                    state.selectedTabId === "limit" ?
                        <LimitForm
                            props={state}
                            pair={pair}
                            currency={currency}
                            onInputChange={onInputChange}
                        />
                        :
                        <StopLimitForm
                            props={state}
                            pair={pair}
                            currency={currency}
                            onInputChange={onInputChange}
                        />
                }
                {
                loggedIn ?
                    <Button string="submit" className="pt-button pt-large pt-intent-primary" text={formName} />
                    :
                    <Button string="button" className="pt-button pt-large pt-intent-primary" text="Login" />
                    }
            </div>
        )
    }
}

OrderForm.propTypes = {
    formName: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    pair: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired
}
OrderForm.defaultProps = {
    decimalPoints: 7
}

export default OrderForm;

const LimitForm = ({props, pair, currency, onInputChange}) => (
    <div className="row">
        <div className="column">
                <FormGroup
                    label="Price"
                    labelFor="text-input"
                    required={true}
                >
                    <input id="text-input"
                           name="price"
                           onChange={(evt) => onInputChange({evt, target: 'price'})} value={props.price} min="0"
                           className="pt-input" type="number" placeholder="Input group" dir="auto"/>
                    <span className="curr-name">{pair}</span>
                </FormGroup>
                <FormGroup
                    label="Total"
                    labelFor="text-input"
                    required={true}
                >
                    <input id="text-input"
                           onKeyPress={() => onInputChange({target: 'radio'})}
                           onChange={(evt) => onInputChange({evt, target: 'total'})} value={props.total} min="0"
                           className="pt-input" type="number" placeholder="Input group" dir="auto"/>
                    <span className="curr-name">{pair}</span>
                </FormGroup>
        </div>
        <div className="column">
                <FormGroup
                    label="Amount"
                    labelFor="text-input"
                    required={true}
                >
                    <input id="text-input"
                           onKeyPress={() => onInputChange({target: 'radio'})}
                           onChange={(evt) => onInputChange({evt, target: 'amount'})} value={props.amount} min="0"
                           className="pt-input" type="number" placeholder="Input group" dir="auto"/>
                    <span className="curr-name">{pair}</span>
                </FormGroup>
                <FormGroup
                    label="Portion"
                    labelFor="text-input"
                >
                    <div className="pt-input-group radio-buttons">
                        <label className={props.portion === 25 ? "box active-box" : "box"}>
                            25%
                            <input type="radio" onChange={(evt) => onInputChange({evt, target: 'portion'})} value={25} checked={props.portion === 25} />
                        </label>
                        <label className={props.portion === 50 ? "box active-box" : "box"}>
                            50%
                            <input type="radio" onChange={(evt) => onInputChange({evt, target: 'portion'})} value={50} checked={props.portion === 50} />
                        </label>
                        <label className={props.portion === 75 ? "box active-box" : "box"}>
                            75%
                            <input type="radio" onChange={(evt) => onInputChange({evt, target: 'portion'})} value={75} checked={props.portion === 75} />
                        </label>
                        <label className={props.portion === 100 ? "box active-box" : "box"}>
                            100%
                            <input type="radio" onChange={(evt) => onInputChange({evt, target: 'portion'})} value={100} checked={props.portion === 100} />
                        </label>
                    </div>
                </FormGroup>
        </div>
    </div>
)

const StopLimitForm = ({props, pair, currency, onInputChange}) => (
    <div className="row">
        <div className="column">
            <FormGroup
                label="Stop Price"
                labelFor="text-input"
            >
                <input id="text-input"
                       onChange={(evt) => onInputChange({evt, target: 'stopPrice'})} value={props.stopPrice} min="0"
                       className="pt-input" type="number" placeholder="Input group" dir="auto"/>
                <span className="curr-name">{pair}</span>
            </FormGroup>
            <FormGroup
                label="Amount"
                labelFor="text-input"
            >
                <input id="text-input"
                       onChange={(evt) => onInputChange({evt, target: 'amount'})} value={props.amount} min="0"
                       className="pt-input" type="number" placeholder="Input group" dir="auto"/>
                <span className="curr-name">{pair}</span>
            </FormGroup>
        </div>
        <div className="column">
            <FormGroup
                label="Limit Price"
                labelFor="text-input"
            >
                <input id="text-input"
                       onChange={(evt) => onInputChange({evt, target: 'limitPrice'})} value={props.limitPrice} min="0"
                       className="pt-input" type="number" placeholder="Input group" dir="auto"/>
                <span className="curr-name">{pair}</span>
            </FormGroup>
            <FormGroup
                label="Total"
                labelFor="text-input"
            >
                <input id="text-input"
                       onChange={(evt) => onInputChange({evt, target: 'total'})} value={props.total} min="0"
                       className="pt-input" type="number" placeholder="Input group" dir="auto"/>
                <span className="curr-name">{pair}</span>
            </FormGroup>

        </div>
    </div>
)
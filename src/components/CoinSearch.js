import React, {Component} from 'react';
import { Icon, Intent } from "@blueprintjs/core";
import { Table, Column, Cell } from "@blueprintjs/table";
import { sorter, filterer, boundDecimal } from "../utils/services";
import PropTypes from 'prop-types';
import { Loading } from "./index";

class CoinSearch extends React.Component {

    render() {
        const self = this;
        let state = this.props.state;
        const filteredCoins = state.filteredCoins;
        return (
            <div style={{height: '100%'}}>
                    <ul>
                        <li className="heading">
                            <span className="star" >
                                &nbsp;
                            </span>
                            <span className="pair" onClick={() => this.props.onChangeFilterName('pair')}>
                                Pair
                                {state.filterName === "pair" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="name" onClick={() => this.props.onChangeFilterName('name')}>
                                Name
                                {state.filterName === "name" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="symbol"  onClick={() => this.props.onChangeFilterName('symbol')}>
                                Symbol
                                {state.filterName === "symbol" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="price" onClick={() => this.props.onChangeFilterName('lastPrice')}>
                                Last Price
                                {state.filterName === "lastPrice" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="change" onClick={() => this.props.onChangeFilterName('change')}>
                                24hr Change
                                {state.filterName === "change" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="price"  onClick={() => this.props.onChangeFilterName('high')}>
                                24hr High
                                {state.filterName === "high" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="price" onClick={() => this.props.onChangeFilterName('low')}>
                                24hr Low
                                {state.filterName === "low" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="price" onClick={() => this.props.onChangeFilterName('volume')}>
                                Volume
                                {state.filterName === "volume" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                        </li>
                    </ul>

                        <ul className="list">
                        {
                            this.props.loading &&
                            <li className="loading-row">
                                <span>
                                    <Loading />
                                </span>
                            </li>
                        }
                        {
                            !this.props.loading &&
                            filteredCoins.sort((a, b) => sorter(a, b, state.sortOrder, state.filterName)).filter((coin) => filterer(state.selectedTabId === "starred", coin, "starred", true)).map(function (coin, index) {
                                return (
                                    <CoinRow
                                        key={index}
                                        props={{index, coin, decimalPoints: self.props.decimalPoints, toggleStar: self.props.toggleStar}}
                                    />
                                )
                            })
                        }
                        {
                            !this.props.loading &&
                            filteredCoins.sort((a, b) => sorter(a, b, state.sortOrder, state.filterName)).filter((coin) => filterer(state.selectedTabId === "starred", coin, "starred", true)).length === 0 &&
                                <NotFound />
                        }
                        </ul>

            </div>
        )
    }
}

CoinSearch.propTypes = {
    loading: PropTypes.bool.isRequired,
    state: PropTypes.object.isRequired,
    toggleStar: PropTypes.func.isRequired,
    onChangeSearchFilter: PropTypes.func.isRequired,
    onChangeFilterName: PropTypes.func.isRequired,
    onChangeSortOrder: PropTypes.func.isRequired
}
CoinSearch.defaultProps = {
    decimalPoints: 7,
    loading: false
}


const NotFound = () => (
    <li  className="not-heading not-found">
        <span style={{textAlign: 'center'}}>
            <Icon style={{color: '#f2b824'}} icon="issue"/>&nbsp;
            No result found.
        </span>
    </li>
);
const CoinRow = ({props}) => (
    <li key={props.index} className="not-heading">
        <span className="star" >
            <Icon icon={props.coin.starred ? 'star' : 'star-empty'} onClick={() => props.toggleStar(props.coin.name)} />
        </span>
        <span className="pair">{props.coin.pair}</span>
        <span className="name">{props.coin.name}</span>
        <span className="symbol">{props.coin.symbol}</span>
        <span className="price">{boundDecimal(props.coin.lastPrice, props.decimalPoints)}</span>
        <span className="change" style={parseFloat(props.coin.change) > 0 ? {color: '#00a45b'} : {color: '#f75535'}}>{boundDecimal(props.coin.change, props.decimalPoints)}%</span>
        <span className="price">{boundDecimal(props.coin.high, props.decimalPoints)}</span>
        <span className="price">{boundDecimal(props.coin.low, props.decimalPoints)}</span>
        <span className="price">{boundDecimal(props.coin.volume, props.decimalPoints)}</span>
    </li>
);

export default CoinSearch;
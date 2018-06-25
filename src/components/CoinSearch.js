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
            <div>
                <table className="pt-html-table pt-interactive pt-html-table-bordered">
                    <thead>
                        <tr>
                            <th style={{width: '50px'}}>
                            </th>
                            <th onClick={() => this.props.onChangeFilterName('pair')}>
                                Pair
                                {state.filterName === "pair" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </th>
                            <th onClick={() => this.props.onChangeFilterName('name')}>
                                Name
                                {state.filterName === "name" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </th>
                            <th onClick={() => this.props.onChangeFilterName('symbol')}>
                                Symbol
                                {state.filterName === "symbol" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </th>
                            <th onClick={() => this.props.onChangeFilterName('lastPrice')}>
                                Last Price
                                {state.filterName === "lastPrice" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </th>
                            <th onClick={() => this.props.onChangeFilterName('change')}>
                                24hr Change
                                {state.filterName === "change" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </th>
                            <th onClick={() => this.props.onChangeFilterName('high')}>
                                24hr High
                                {state.filterName === "high" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </th>
                            <th onClick={() => this.props.onChangeFilterName('low')}>
                                24hr Low
                                {state.filterName === "low" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </th>
                            <th onClick={() => this.props.onChangeFilterName('volume')}>
                                Volume
                                {state.filterName === "volume" && <span>
                                    <Icon icon={state.sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </th>
                        </tr>
                    </thead>

                        <tbody>
                        {
                            this.props.loading &&
                            <tr className="loading-row">
                                <td style={{height: '400px'}} colSpan={9} rowSpan={8}>
                                    <Loading />
                                </td>
                            </tr>
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
                        </tbody>

                </table>
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
    <tr>
        <td style={{textAlign: 'center'}} colSpan={9}>
            <Icon style={{color: '#f2b824'}} icon="issue"/>&nbsp;
            No result found.
        </td>
    </tr>
);
const CoinRow = ({props}) => (
    <tr key={props.index}>
        <td style={{width: '50px'}}>
            <Icon icon={props.coin.starred ? 'star' : 'star-empty'} onClick={() => props.toggleStar(props.coin.name)} />
        </td>
        <td>{props.coin.pair}</td>
        <td>{props.coin.name}</td>
        <td>{props.coin.symbol}</td>
        <td>{boundDecimal(props.coin.lastPrice, props.decimalPoints)}</td>
        <td style={parseFloat(props.coin.change) > 0 ? {color: '#00a45b'} : {color: '#f75535'}}>{boundDecimal(props.coin.change, props.decimalPoints)}%</td>
        <td>{boundDecimal(props.coin.high, props.decimalPoints)}</td>
        <td>{boundDecimal(props.coin.low, props.decimalPoints)}</td>
        <td>{boundDecimal(props.coin.volume, props.decimalPoints)}</td>
    </tr>
);

export default CoinSearch;
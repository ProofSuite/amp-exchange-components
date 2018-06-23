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
                                    <tr key={index}>
                                        <td style={{width: '50px'}}>
                                            <Icon icon={coin.starred ? 'star' : 'star-empty'} onClick={() => self.props.toggleStar(coin.name)} />
                                        </td>
                                        <td>{coin.pair}</td>
                                        <td>{coin.name}</td>
                                        <td>{coin.symbol}</td>
                                        <td>{boundDecimal(coin.lastPrice, self.props.decimalPoints)}</td>
                                        <td style={parseFloat(coin.change) > 0 ? {color: '#00a45b'} : {color: '#f75535'}}>{boundDecimal(coin.change, self.props.decimalPoints)}</td>
                                        <td>{boundDecimal(coin.high, self.props.decimalPoints)}</td>
                                        <td>{boundDecimal(coin.low, self.props.decimalPoints)}</td>
                                        <td>{boundDecimal(coin.volume, self.props.decimalPoints)}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            !this.props.loading &&
                            filteredCoins.sort((a, b) => sorter(a, b, state.sortOrder, state.filterName)).filter((coin) => filterer(state.selectedTabId === "starred", coin, "starred", true)).length === 0 &&
                            <tr>
                                <td style={{textAlign: 'center'}} colSpan={9}>
                                    <Icon style={{color: '#f2b824'}} icon="issue"/>&nbsp;
                                     No result found.
                                </td>
                            </tr>
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

const cellRenderer = (rowIndex) => {
    console.log(rowIndex)
    return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
};

// const cellRenderer = (coinsList, rowIndex) => {
//     console.log(coinsList, rowIndex)
//     return  <Cell>{'coin.name'}</Cell>
// };
export default CoinSearch;
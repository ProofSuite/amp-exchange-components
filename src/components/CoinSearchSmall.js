import React, {Component} from 'react';
import { Icon, Colors } from "@blueprintjs/core";
import { sorter, filterer, boundDecimal } from "../utils/services";
import PropTypes from 'prop-types';
import { Loading } from "./index";

class CoinSearchSmall extends React.Component {

    render() {
        const self = this;
        const {
            state: {
                filterName,
                sortOrder
            },
            loading,
            filteredCoins,
            decimalPoints,
            toggleStar,
            onChangeFilterName
        } = this.props;

        return (
            <div style={{height: '100%'}}>
                    <ul>
                        <li className="heading">
                            <span className="star" >
                                &nbsp;
                            </span>
                            <span className="pair" onClick={() => onChangeFilterName('pair')}>
                                Pair
                                {filterName === "pair" && <span>
                                    <Icon icon={sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="name" onClick={() => onChangeFilterName('name')}>
                                Name
                                {filterName === "name" && <span>
                                    <Icon icon={sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="symbol"  onClick={() => onChangeFilterName('symbol')}>
                                Symbol
                                {filterName === "symbol" && <span>
                                    <Icon icon={sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="price" onClick={() => onChangeFilterName('lastPrice')}>
                                Last Price
                                {filterName === "lastPrice" && <span>
                                    <Icon icon={sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="change" onClick={() => onChangeFilterName('change')}>
                                24hr Change
                                {filterName === "change" && <span>
                                    <Icon icon={sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="price"  onClick={() => onChangeFilterName('high')}>
                                24hr High
                                {filterName === "high" && <span>
                                    <Icon icon={sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="price" onClick={() => onChangeFilterName('low')}>
                                24hr Low
                                {filterName === "low" && <span>
                                    <Icon icon={sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                            <span className="price" onClick={() => onChangeFilterName('volume')}>
                                Volume
                                {filterName === "volume" && <span>
                                    <Icon icon={sortOrder === "asc" ? 'chevron-down' : 'chevron-up'} />
                                </span>}
                            </span>
                        </li>
                    </ul>

                        <ul className="list">
                        {
                            loading &&
                            <li className="loading-row">
                                <span>
                                    <Loading />
                                </span>
                            </li>
                        }
                        {
                            !loading &&
                            filteredCoins.map(function (coin, index) {
                                return (
                                    <CoinRow
                                        key={index}
                                        props={{index, coin, decimalPoints: decimalPoints, toggleStar: toggleStar}}
                                    />
                                )
                            })
                        }
                        {
                            !loading &&
                            filteredCoins.length === 0 &&
                                <NotFound />
                        }
                        </ul>

            </div>
        )
    }
}

CoinSearchSmall.propTypes = {
    loading: PropTypes.bool.isRequired,
    state: PropTypes.object.isRequired,
    toggleStar: PropTypes.func.isRequired,
    onChangeSearchFilter: PropTypes.func.isRequired,
    onChangeFilterName: PropTypes.func.isRequired,
    onChangeSortOrder: PropTypes.func.isRequired
}
CoinSearchSmall.defaultProps = {
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
        <span className="change" style={parseFloat(props.coin.change) > 0 ? {color: Colors.GREEN5} : {color: Colors.RED4}}>{boundDecimal(props.coin.change, props.decimalPoints)}%</span>
        <span className="price">{boundDecimal(props.coin.high, props.decimalPoints)}</span>
        <span className="price">{boundDecimal(props.coin.low, props.decimalPoints)}</span>
        <span className="price">{boundDecimal(props.coin.volume, props.decimalPoints)}</span>
    </li>
);

export default CoinSearchSmall;
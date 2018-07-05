import React, {Component} from 'react';
import { CoinSearch } from "../components";
import PropTypes from 'prop-types';
import { Icon, Card, Tabs, Tab } from "@blueprintjs/core";
import { getObjectFromProperty, filterer, sorter } from "../utils/services";

class CoinSearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coinsList: this.props.coinsList.btc,
            searchFilter: '',
            filteredCoins: this.props.coinsList.btc,
            filterName: 'name',
            sortOrder: 'asc',
            selectedTabId: 'btc',
            orderChanged: false
        }
    }

    toggleStar = (name) => {
        let coin = getObjectFromProperty(this.state.filteredCoins, 'name', name);
        console.log(coin)
        if(coin) {
            coin.starred = !coin.starred;
        }
        let filteredCoins = this.state.filteredCoins;
        this.setState({
            filteredCoins: filteredCoins
        })
    }

    onChangeSearchFilter = (e) => {
        let X;
        if(e.target.value){
            X = this.state.coinsList.filter(function (coin) {
                return coin.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
            })
        }
        else {
            X = this.state.coinsList;
        }
        this.setState({
            searchFilter: e.target.value,
            filteredCoins: X
        })
    }
    onChangeFilterName = (value) => {
        if(value === this.state.filterName && !this.state.orderChanged) {
            this.setState({
                filterName: value,
                sortOrder: 'desc',
                orderChanged: true,
            })
        }
        else {
            this.setState({
                filterName: value,
                sortOrder: 'asc',
                orderChanged: false,
            })
        }
    }
    onChangeSortOrder = (value) => {
        this.setState({
            sortOrder: value,
        })
    }
    changeTab = (tabId) => {
        let filteredCoins;
        if (tabId !== "starred") {
            filteredCoins = this.props.coinsList[tabId];
        }
        else {
            filteredCoins = this.props.coinsList.btc;
        }

        this.setState({
            selectedTabId: tabId,
            filteredCoins: filteredCoins
        })
    }
    render() {
        const {
            state: {
                selectedTabId, searchFilter, sortOrder, filterName, filteredCoins
            },
            props: {
                style, loading, small
            },
            toggleStar,
            onChangeSearchFilter,
            onChangeFilterName,
            onChangeSortOrder,
            changeTab
        } = this;
        return (
            <Card style={{width: '100%', margin: '10px'}} className="pt-dark">
                <div style={style}  className={small ? "small-searcher coin-searcher" : "coin-searcher"}>
                    <Tabs id="TabsExample" selectedTabId={selectedTabId}  onChange={changeTab}>
                        <input onChange={onChangeSearchFilter} value={searchFilter} className="pt-input" type="text" placeholder="Search ..." dir="auto" />
                        <Tab id="btc" title="BTC Market" panel={
                            <CoinSearch
                                state={this.state}
                                filteredCoins={
                                    filteredCoins.sort((a, b) => sorter(a, b, sortOrder, filterName))
                                        .filter((coin) => filterer(selectedTabId === "starred", coin, "starred", true))
                                }
                                loading={loading}
                                small={small}
                                toggleStar={toggleStar}
                                onChangeSearchFilter={onChangeSearchFilter}
                                onChangeFilterName={onChangeFilterName}
                                onChangeSortOrder={onChangeSortOrder}
                            />
                        } />
                        <Tab id="usdt" title="USDT Market" panel={
                            <CoinSearch
                                state={this.state}
                                filteredCoins={
                                    filteredCoins.sort((a, b) => sorter(a, b, sortOrder, filterName))
                                        .filter((coin) => filterer(selectedTabId === "starred", coin, "starred", true))
                                }
                                loading={loading}
                                small={small}
                                toggleStar={toggleStar}
                                onChangeSearchFilter={onChangeSearchFilter}
                                onChangeFilterName={onChangeFilterName}
                                onChangeSortOrder={onChangeSortOrder}
                            />
                        } />
                        <Tab id="starred" title={<Icon icon='star'/>} panel={
                            <CoinSearch
                                state={this.state}
                                filteredCoins={
                                    filteredCoins.sort((a, b) => sorter(a, b, sortOrder, filterName))
                                        .filter((coin) => filterer(selectedTabId === "starred", coin, "starred", true))
                                }
                                loading={loading}
                                small={small}
                                toggleStar={toggleStar}
                                onChangeSearchFilter={onChangeSearchFilter}
                                onChangeFilterName={onChangeFilterName}
                                onChangeSortOrder={onChangeSortOrder}
                            />
                        } />
                    </Tabs>

                </div>
            </Card>
        )
    }
}

CoinSearchContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    coinsList: PropTypes.object.isRequired
}
CoinSearchContainer.defaultProps = {
    decimalPoints: 7,
    loading: false,
    small: false,
    style: {}
}
export default CoinSearchContainer;
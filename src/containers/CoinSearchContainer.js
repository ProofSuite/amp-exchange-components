import React, {Component} from 'react';
import { CoinSearch } from "../components";
import PropTypes from 'prop-types';


class CoinSearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coinsList: this.props.coinsList,
            searchFilter: '',
            filteredCoins: this.props.coinsList,
            filterName: 'name',
            sortOrder: 'asc',
            orderChanged: false
        }
    }

    toggleStar = (index) => {
        let coin = this.state.filteredCoins[index];
        coin.starred = !coin.starred;
        let filteredCoins = this.state.filteredCoins;
        this.setState({
            filteredCoins: filteredCoins
        })
    }

    onChangeSearchFilter = (e) => {
        let X;
        if(e.target.value){
            X = this.props.coinsList.filter(function (coin) {
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
    render() {
        return (
            <div className="coin-searcher">
                <CoinSearch
                    state={this.state}
                    loading={this.props.loading}
                    toggleStar={this.toggleStar}
                    onChangeSearchFilter={this.onChangeSearchFilter}
                    onChangeFilterName={this.onChangeFilterName}
                    onChangeSortOrder={this.onChangeSortOrder}
                />
            </div>
        )
    }
}

CoinSearchContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    coinsList: PropTypes.array.isRequired
}
// CoinSearchContainer.defaultProps = {
//     // decimalPoints: 7,
//     // loading: false
// }


export default CoinSearchContainer;
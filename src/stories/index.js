import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { OrderBook, OrderForm } from "../components";
import { OrderBookContainer, OrderFormContainer, CoinSearchContainer, TradeHistoryContainer } from "../containers";
import SimpleChart from "../components/SimpleChart";
import * as orderList from "../jsons/ordersList.json";
import * as coinsList from "../jsons/coinsList.json";
import * as tradeHistory from "../jsons/tradeHistory.json";

import '../App.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../styles/css/style.css";
import "@blueprintjs/table/lib/css/table.css";

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Order Book', module)
  .add('Loading', () => <OrderBookContainer
      orderList={orderList}
      bookName="Sell"
      loading={true}
      currency="ETH"
      pair="BTC"
  />)
  .add('Sell Order', () => <OrderBookContainer
      orderList={orderList}
      bookName="Sell"
      currency="ETH"
      pair="BTC"
  />)
  .add('Buy Order', () => <OrderBook
      orderList={orderList}
      currency="ETH"
      bookName="Buy"
      pair="USDT"
  />);

storiesOf('Order Form', module)
    .add('Logged Out State', () => <OrderFormContainer
        askPrice={0.25}
        bidPrice={0.29}
        totalCurrBalance={1000}
        totalPairBalance={10}
        formName="Sell"
        currency="ETH"
        pair="BTC"
        loggedIn={false}
    />)
    .add('Sell Book', () => <OrderFormContainer
        askPrice={0.25}
        bidPrice={0.29}
        totalCurrBalance={1000}
        totalPairBalance={10}
        formName="Sell"
        currency="ETH"
        pair="BTC"
        loggedIn={true}
    />)
    .add('Buy Book', () => <OrderFormContainer
        askPrice={0.25}
        bidPrice={0.29}
        totalCurrBalance={10000}
        totalPairBalance={10}
        formName="Buy"
        currency="XRP"
        pair="BTC"
        loggedIn={true}
    />);

storiesOf('Coin Searcher', module)
    .add('Loading', () => <CoinSearchContainer
        coinsList={coinsList.list}
        loading={true}
    />)
    .add('Not Loading', () => <CoinSearchContainer
        coinsList={coinsList.list}
        loading={false}
    />);

storiesOf('Trade History', module)
    .add('Loading', () => <TradeHistoryContainer
        tradeHistory={tradeHistory.list}
        loading={true}
    />)
    .add('Not Loading', () => <TradeHistoryContainer
        tradeHistory={tradeHistory.list}
        loading={false}
    />);

storiesOf('Simple Chart', module)
    .add('Loading', () => <SimpleChart
    />);







// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));

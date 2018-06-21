import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { OrderBook, OrderForm } from "../components";
import * as orderList from "../ordersList.json";

import '../App.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../styles/css/style.css";

const Hello = ({ onClick, message }) => {
    return (
        <div>
            <h1 >{ message }</h1
            ><button onClick={onClick}>Click</button>
        </div>
    )
}

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Order Book', module)
  .add('Sell Order', () => <OrderBook
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
    .add('Sell Book', () => <OrderForm
        askPrice={0.25}
        bidPrice={0.29}
        totalCurrBalance={1000}
        totalPairBalance={10}
        formName="Sell"
        currency="ETH"
        pair="BTC"
        loggedIn={false}
    />)
    .add('Buy Book', () => <OrderForm
        askPrice={0.25}
        bidPrice={0.29}
        totalCurrBalance={10000}
        totalPairBalance={10}
        formName="Buy"
        currency="XRP"
        pair="BTC"
        loggedIn={true}
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

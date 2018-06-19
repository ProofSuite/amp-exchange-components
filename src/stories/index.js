import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import OrderBook from "../components/OrderBook";
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

storiesOf('Hello', module)
  .add('Click', () => <OrderBook orderList={orderList} bookName="Sell" />);






// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));

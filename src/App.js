import React, { Component } from 'react';
import './App.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./styles/css/style.css";

import "@blueprintjs/table/lib/css/table.css";
import { OrderBookContainer, OrderFormContainer, CoinSearchContainer } from "./containers";
import * as coinsList from "./jsons/coinsList.json";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CoinSearchContainer
            coinsList={coinsList.list}
            loading={false}
        />
      </div>
    );
  }
}

export default App;

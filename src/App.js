import React, { Component } from 'react';
import './App.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./styles/css/style.css";
import socketIOClient from 'socket.io-client'
import { timeParse } from "d3-time-format";

import "@blueprintjs/table/lib/css/table.css";
import {MainChartContainer, LandingPage} from "./containers";
import SimpleChart from "./components/DepthChart";
import * as coinsList from "./jsons/coinsList.json";
const WebSocket = require('ws');


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:4001", // this is where we are connecting to with sockets,
            socket: socketIOClient("localhost:4001"),
            ohlcvData: []
        }
    }
    componentDidMount() {
        const {socket} = this.state;
        socket.emit('get-ohlc');
    }
    arrToObj = (arr) => {
        let newArr = [];
        arr.map((item) => {
            let obj = {};
            obj['date'] = new Date(item[0] * 1000);
            obj['high'] = parseFloat(item[1]);
            obj['low'] = parseFloat(item[2]);
            obj['open'] = parseFloat(item[3]);
            obj['close'] = parseFloat(item[4]);
            obj['volume'] = parseFloat(item[5]);
            newArr.push(obj);
        })
        return newArr;
    }

    render() {
      const {socket, ohlcvData} = this.state;
      const self = this, ohlcvDataArr = [];
      socket.on('get-ohlc-by-Server', function(data){
            let ohlcv = self.arrToObj(data);
            self.setState({
                ohlcvData: ohlcv
            })
          console.log(ohlcv, 'ohlcv')
      });
      return (
      <div className="App">
          <MainChartContainer
              ohlcvData={ohlcvData}
          />
      </div>
    );
  }
}

export default App;

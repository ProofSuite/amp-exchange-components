const fs = require('fs-extra');
const path = require('path');
const CMCData = require('../jsons/CMCData.json');



const orderList = path.resolve(__dirname, 'ordersList.json');
const tradeHistory = path.resolve(__dirname, 'tradeHistory.json');
const coinsList = path.resolve(__dirname, 'coinsList.json');
fs.removeSync(orderList);
fs.removeSync(tradeHistory);
fs.removeSync(coinsList);

fs.writeFile("./jsons/ordersList.json", orderListJSON());
fs.writeFile("./jsons/tradeHistory.json", tradeHistoryJSON());
fs.writeFile("./jsons/coinsList.json", coinsListJSON());


function orderListJSON () {
    var json = {
        list: []
    }
    let sample = {amount: 0, price: 0};
    for (let i=0; i<50; i++){
        sample.amount = parseFloat((Math.random()*1000).toFixed(4));
        sample.price = parseFloat((Math.random()/100).toFixed(4));
        json.list.push(sample);
        sample = {amount: 0, price: 0};
    }
    return JSON.stringify(json);
}

function tradeHistoryJSON () {
    var json = {
        list: []
    }
    let sample = {
        time: 1229779335639,
        type: "buy",
        amount: 21212,
        price: 0.0022
    };

    for (let i=0; i<50; i++){
        sample.amount = parseFloat((Math.random()*10000).toFixed(4));
        sample.price = parseFloat((Math.random()/100).toFixed(4));
        sample.type = parseInt(Math.random() * 10)%2 === 0 ? "buy" : "sell";
        sample.time = parseInt(Math.random() * (1529838864571 - 1289062415000 + 1))+1289062415000;
        json.list.push(sample);
        sample = {
            time: 1229779335639,
            type: "buy",
            amount: 21212,
            price: 0.0022
        };
    }
    return JSON.stringify(json);
}

coinsListJSON();

function coinsListJSON() {
    var json = {
        list: {
            btc: [],
            usdt: []
        }
    }
    let coins = Object.values(CMCData.data);
    let sample = {
        name: "",
        symbol: "",
        pair: "",
        lastPrice: 0,
        change: "",
        high: 0,
        low: 0,
        volume: 0,
        starred: false
    };

    for (let i=0; i<50; i++){
        sample.name = coins[i].name;
        sample.symbol = coins[i].symbol;
        sample.lastPrice = parseFloat((Math.random()/100).toFixed(4));
        sample.starred = parseInt(Math.random() * 10)%2 === 0 ? true : false;
        sample.change = parseInt(Math.random() * 10)%2 === 0 ? "-"+parseFloat(((Math.random() * 99) + 1).toFixed(1)) : "+"+parseFloat(((Math.random() * 99) + 1).toFixed(1));
        sample.high = parseFloat((Math.random()/10).toFixed(4));
        sample.low = parseFloat((Math.random()/100).toFixed(4));
        sample.volume = parseFloat((Math.random()*10000).toFixed(4));
        sample.pair = sample.symbol+"/BTC";
        json.list.btc.push(sample);
        sample = {
            name: "",
            symbol: "",
            pair: "BTC/BTC",
            lastPrice: 0,
            change: "",
            high: 0,
            low: 0,
            volume: 0,
            starred: false
        };
    }
    for (let i=0; i<50; i++){
        sample.name = coins[i].name;
        sample.symbol = coins[i].symbol;
        sample.lastPrice = parseFloat((Math.random()/100).toFixed(4));
        sample.starred = parseInt(Math.random() * 10)%2 === 0 ? true : false;
        sample.change = parseInt(Math.random() * 10)%2 === 0 ? "-"+parseFloat(((Math.random() * 99) + 1).toFixed(1)) : "+"+parseFloat(((Math.random() * 99) + 1).toFixed(1));
        sample.high = parseFloat((Math.random()/100).toFixed(4));
        sample.low = parseFloat((Math.random()/100).toFixed(4));
        sample.volume = parseFloat((Math.random() * 10000).toFixed(4));
        sample.pair = sample.symbol+"/USDT";
        json.list.usdt.push(sample);
        sample = {
            name: "",
            symbol: "",
            pair: "",
            lastPrice: 0,
            change: "",
            high: 0,
            low: 0,
            volume: 0,
            starred: false
        };
    }
    return JSON.stringify(json);
}

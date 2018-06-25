const fs = require('fs-extra');
const path = require('path');
const CMCData = require('../jsons/CMCData.json');
const bidAsk = require('../jsons/bidAsk.json');




const orderList = path.join(__dirname, '../jsons/', 'ordersList.json');
const tradeHistory = path.join(__dirname, '../jsons/', 'tradeHistory.json');
const coinsList = path.join(__dirname, '../jsons/', 'coinsList.json');
const sellOrders = path.join(__dirname, '../jsons/', 'sellOrders.json');
const bidAsks = path.join(__dirname, '../jsons/', 'bidAsk.json');
fs.removeSync(orderList);
fs.removeSync(tradeHistory);
fs.removeSync(coinsList);
fs.removeSync(sellOrders);
fs.removeSync(bidAsks);


fs.writeFile(path.join(__dirname, '../jsons/', 'ordersList.json'), orderListJSON());
fs.writeFile(path.join(__dirname, '../jsons/', 'tradeHistory.json'), tradeHistoryJSON());
fs.writeFile(path.join(__dirname, '../jsons/', 'coinsList.json'), coinsListJSON());
fs.writeFile(path.join(__dirname, '../jsons/', 'sellOrders.json'), sellOrdersJSON());
fs.writeFile(path.join(__dirname, '../jsons/', 'bidAsks.json'), bidAskJSON());


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

function sellOrdersJSON() {
    var json = {
        list: []
    }
    let sample = {x: 0, y: 0};
    for (let i=0; i<50; i++){
        sample.x = parseFloat((Math.random()*10).toFixed());
        sample.y = parseFloat((Math.random()*1000).toFixed());
        json.list.push(sample);
        sample = {x: 0, y: 0};
    }
    return JSON.stringify(json);
}

function bidAskJSON() {

    function processData(list, type, desc) {
        // console.log(list, type, desc)

        // Convert to data points
        for(var i = 0; i < list.length; i++) {
            list[i] = {
                value: Number(list[i][0]),
                volume: Number(list[i][1]),
            }
        }

        // Sort list just in case
        list.sort(function(a, b) {
            if (a.value > b.value) {
                return 1;
            }
            else if (a.value < b.value) {
                return -1;
            }
            else {
                return 0;
            }
        });

        // Calculate cummulative volume
        if (desc) {
            for(var i = list.length - 1; i >= 0; i--) {
                if (i < (list.length - 1)) {
                    list[i].totalvolume = list[i+1].totalvolume + list[i].volume;
                }
                else {
                    list[i].totalvolume = list[i].volume;
                }
                var dp = {};
                dp["value"] = list[i].value;
                dp[type + "volume"] = list[i].volume;
                dp[type + "totalvolume"] = list[i].totalvolume;
                res.unshift(dp);
            }
        }
        else {
            for(var i = 0; i < list.length; i++) {
                if (i > 0) {
                    list[i].totalvolume = list[i-1].totalvolume + list[i].volume;
                }
                else {
                    list[i].totalvolume = list[i].volume;
                }
                var dp = {};
                dp["value"] = list[i].value;
                dp[type + "volume"] = list[i].volume;
                dp[type + "totalvolume"] = list[i].totalvolume;
                res.push(dp);
            }
        }

    }

    var res = [];
    processData(bidAsk.bids, "bids", true);
    processData(bidAsk.asks, "asks", false);

    // console.log(res);
    var json = {
        list: res
    }
    return JSON.stringify(json);
}

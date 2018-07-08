const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const ws = require('ws')
const w = new ws('wss://ws.cex.io/ws/')
let ohlcData;

w.on('message', (msg) => {
    msg = JSON.parse(msg);
    console.log(msg, 'init-ohlcv-data')
    if(msg.e === "init-ohlcv-data") {
        ohlcData=msg.data;
    }
})


let msg = JSON.stringify({
    "e": "init-ohlcv",
    "i": "1h",
    "rooms": [
        "pair-BTC-USD"
    ]
})
let ping = JSON.stringify({
    "e": "ping",
    "time": 1435927943922
})
let ticker = JSON.stringify({
    "e": "subscribe",
    "rooms": [
        "tickers"
    ]
})
let oldPairRoom = JSON.stringify({
    "e": "subscribe",
    "rooms": ["pair-BTC-USD"]
})
w.on('open', () => w.send(msg))

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
    console.log('New client connected')

    const w = new ws('wss://ws.cex.io/ws/')
    socket.on('get-ohlc', () => { //emit this event from Client
        console.log('get-ohlc')
        io.sockets.emit('get-ohlc-by-Server', ohlcData); //listen to this event from Client -> socket.on('get-ohlc-by-Server', ()=>{})
        setInterval(function () {
            io.sockets.emit('get-ohlc-by-Server', ohlcData); //listen to this event from Client -> socket.on('get-ohlc-by-Server', ()=>{})
            // console.log('emititng')
        }, 60000)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
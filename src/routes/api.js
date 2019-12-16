const express = require('express')
const router = express.Router()
var request = require('request')

const dotenv = require('dotenv')
dotenv.config()

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD

const headers = {
  'content-type': 'text/plain;'
}

const network2port = {
  mainnet: 8332,
  testnet: 18332
}

function getData(network, requestData, res) {
  const port = network2port[network]
  if (!port) throw new Error(`Invalid network ${network}`)
  const options = {
    url: `http://${USER}:${PASS}@127.0.0.1:${port}/`,
    method: 'POST',
    headers: headers,
    body: requestData
  }

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body)
      res.send(data)
    }
  }

  request(options, callback)
}

router.get('/test', (req, res) => res.json({ msg: 'backend works' }))

router.get('/:network/getblockcount', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getbestblockhash', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getbestblockhash","params":[]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getconnectioncount', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getconnectioncount","params":[]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getdifficulty', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getdifficulty","params":[]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getblockchaininfo', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockchaininfo","params":[]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getmininginfo', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getmininginfo","params":[]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getpeerinfo', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getpeerinfo","params":[]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getrawmempool', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawmempool","params":[]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getblock/:hash', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblock","params":["${req.params.hash}"]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getblockhash/:index', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${req.params.index}]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getblock/:blockhash', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblock","params":[${req.params.blockhash}]}`
  getData(req.params.network, dataString, res)
})

router.get('/:network/getrawtransaction/:blockhash/:id', (req, res) => {
  var data = {
    jsonrpc: '1.0',
    id: 'curltext',
    method: 'getrawtransaction',
    params: [req.params.id, true, req.params.blockhash]
  }
  var dataString = JSON.stringify(data)
  getData(req.params.network, dataString, res)
})

router.get('/:network/decoderawtransaction/:hex', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"decoderawtransaction","params":["${req.params.hex}"]}`
  getData(req.params.network, dataString, res)
})

module.exports = router

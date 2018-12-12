const express = require('express')
const ws = require('ws')

const PORT = 8080

const wss = new ws.Server({ port: PORT })

const clients = []

function handleMessage(message) {
    const message = message.split(':')
}

function handleError(error) {
    console.error(error)
}

function handleClose(ws) {
    console.error(ws)
}

function sendHeader(ws) {
    const header = `P2P Tracker :: v0.0.1\n`
    ws.send(header)
}

wss.on('connection', (ws, req) => {
    console.log('Client connected', req.connection.remoteAddress)
    sendHeader(ws)
    ws.on('message', handleMessage)
    ws.on('error', handleError)
    ws.on('close', handleClose)
})

console.log(`P2P Tracker listening on ${PORT}`)

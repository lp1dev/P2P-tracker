const express = require('express')
const ws = require('ws')

const app = express()
const PORT = 8080

const wss = new ws.Server({port: PORT+1})

const files = []

app.get('/', (request, response) => {
    response.send(files)
})

app.listen(PORT, () => {
    console.log(`Tracker web server listening on ${PORT}`) 
})

function handleMessage(message) {
    try {
        JSON.parse(message)        
    } catch (e) {
        console.error(e)
    }    
}

function handleError(error) {
    console.error(error)
}

function handleClose(ws) {
    console.error(ws)
}

wss.on('connection', (ws, req) => {
    console.log('Client connected', req.connection.remoteAddress)
    ws.on('message', handleMessage)
    ws.on('error', handleError)
    ws.on('close', handleClose)
})

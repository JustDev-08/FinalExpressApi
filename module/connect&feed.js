const { Router } = require('express');
const connectRount = Router();
const mqtt = require('mqtt')

// option for mqtt
const option1 = {
    reconnectreconnectPeriod: 0,
    connectTimeout: 5000,

}

connectRount.post('/feed', (req, res) => {
    const userData = req.body
    const client = mqtt.connect(userData.url, option1)
    client.on('connect', () => {
      client.publish(userData.topic + userData.password, userData.control +"/"+ userData.ml)
        const rev = `/feed/board/pass/${userData.password}/callback`
        client.subscribe(rev, () => {
            client.on('message', (topic, mess) => {
                res.json({
                    status: 'Said Successfully'
                })
                client.end()
                res.end()
                clearTimeout(delay)
            })
            const delay = setTimeout(() => { 
                res.json({
                    status:"Error"
                })
                res.end()
            }, 5000)


        })})
        client.on('error', (err) => {
            res.json({
                status: 'Error'
            })
            client.end()
            res.end()
        })
    })

    connectRount.post('/can', async (req, res) => {
        const userData = req.body

        const client = mqtt.connect(userData.url, option1)
        client.on('connect', () => {
            console.log('Connected');
            res.json({
                'CanConnect': true
            })
            client.end()
            res.end()
            clearTimeout(delay)
        })
        client.on('error', () => {
            console.log('err');
            res.json({
                'CanConnect': false
            })
            client.end()
            res.end()
            clearTimeout(delay)
        })
        const delay = setTimeout(()=>{
            res.json({
                'CanConnect':false
            })
            client.end()
            res.end()
        },10000)


    })

    module.exports = connectRount



import express from 'express'
import { Admin } from './kafka/admin'
import { Producer } from './kafka/producer'
import { Consumer } from './kafka/consumer'
import { getCat } from './cat'

const app = express()
const port = 3000

app.listen(port, async () => {       
  console.log( `server started at http://localhost:${port}`)
  await init()
})

async function init() {
  // setup admin
  const admin = new Admin()
  await admin.connect()
  await admin.createTopics([{
      topic: 'realtime-data',
      numPartitions: 3
    }]
  )
  await admin.disconnect()

  // setup consumer
  const consumer = new Consumer('test-group')
  await consumer.connect()
  await consumer.consumeFromQueue('realtime-data')

  // setup producer
  const producer = new Producer()
  await producer.connect()
  setInterval(async () => {
    producer.publishToQueue('realtime-data', [{key: 'cat', value: await getCat()}])
  }, 5000)
}

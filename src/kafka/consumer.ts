import { kafka } from './config'
import { sendCat } from '../cat'

export class Consumer {
    private consumer
    private groupId

    constructor(groupId: string) {
        this.groupId = groupId
        this.consumer = kafka.consumer({ groupId: this.groupId })
    }

    public connect = async() => {
        try {
            await this.consumer.connect() 
        } catch (error) {
            console.log(error)
        }
    }

    public disconnect = async() => {
        try {
            await this.consumer.disconnect()
        } catch (error) {
            console.log(error)
        }
    }

    public consumeFromQueue = async (topic: string) => {
        try {
            await this.consumer.subscribe({ topic: topic, fromBeginning: true })   
        } catch (error) {
            console.log(error) 
        }
       
        // start get message
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try{
                    console.log({
                        topic,
                        partition,
                        offset: message.offset,
                        value: message.value.toString(),
                    })
                    
                    const myCat = await sendCat(message.value.toString())
                    console.log(myCat)
                }
                catch(error) {
                    console.log(error)   
                }
            },
        })
    }
}

const { Worker } = require("bullmq");
const { redisClient } = require('../../redis')

let subscriberMap = {};
class BaseSubscriber {
    constructor(queueName) {
        this.queueName = queueName;
        this.processHandler = this.processHandler.bind(this)
        this.register()
    }

    register(context) {
        subscriberMap[this.queueName] = context
        new Worker(this.queueName, this.processHandler, { removeOnComplete: true, connection: redisClient, removeOnFail: 1000, runRetryDelay: null  })
    }

    processHandler(job) {
        try {
            const currentContext = subscriberMap[this.queueName];
            currentContext[job.name](job.data)
            console.log(`Processing ${job.name}`)
            return `Processed ${job.name}`
        } catch (error){
            done(error)
        }
    }
}

module.exports = BaseSubscriber
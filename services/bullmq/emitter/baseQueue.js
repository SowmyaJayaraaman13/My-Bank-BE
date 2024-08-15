const { Queue } = require("bullmq");
const { redisClient } = require("../../redis");

class BaseQueue {
  constructor(queueName) {
    this.queueName = queueName;
    this.queue;
  }

  register(queueOptions = {}) {
    this.queue = new Queue(this.queueName, { 
        connection: redisClient, 
        defaultJobOptions: {
            removeOnComplete: true,
            removeOnFail: 1000,
        }
     });
  }

  async publish(job, data) {
    try {
      const res = await this.queue.add(job, data);
      console.log(`Job added with ID: ${res.id}`);
      return res
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BaseQueue;

const express = require('express');
require('dotenv').config();
const queues = require('./services/bullmq/emitter/index')
require('./services/bullmq/subscriber/index')

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Endpoint to add a job to the queue
app.post('/add-job', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send('Message is required');
  }

  try {
    const job = await queues.emailQueue.publish('sendEmail', { ...message });
    res.status(200).send(`Job added with ID: ${job.id}`);
  } catch (err) {
    res.status(500).send('Error adding job');
  }
});

// Endpoint to get the status of a job
app.get('/job-status/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const job = await queues.emailQueue.getJob(id);
    console.log(job)
    if (!job) {
      return res.status(404).send('Job not found');
    }
    const state = await job.getState();
    res.status(200).json({
      id: job.id,
      state,
      result: job.finishedOn ? await job.returnvalue : 'Pending'
    });
  } catch (err) {
    res.status(500).send('Error getting job status');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

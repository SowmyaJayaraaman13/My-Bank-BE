const express = require('express');
require('dotenv').config();
const queues = require('./services/bullmq/emitter/index');
require('./services/bullmq/subscriber/index');

const { dbConnection } = require('./database/index');

const passport = require('passport');
const { jwtStrategy } = require('./passport');

const { authMiddleWareHandler } = require('./authentication/auth');
const app = express();

app.use(authMiddleWareHandler);


// import route files
const accountRoutes = require('./routes/accounts');
const cardRoutes = require('./routes/card');
const transactionRoutes = require('./routes/transaction');
const categoryRoutes = require('./routes/category');


const port = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', accountRoutes);
app.use('/api', cardRoutes);
app.use('/api', transactionRoutes);
app.use('/api', categoryRoutes);



app.use(passport.initialize());
// app.use(passport.session());
passport.use('jwt', jwtStrategy)


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

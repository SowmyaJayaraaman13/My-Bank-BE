var requireDirectory = require('require-directory');
const data = requireDirectory(module);

const queues = {}

Object.keys(data).forEach(key => {
    if(key !== 'baseSubscriber') {
        queues[key] = new data[key]
    }
})

module.exports = queues;
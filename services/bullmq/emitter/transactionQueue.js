const { QUEUE_NAME } = require("../../../constants/queue");
const BaseQueue = require("./baseQueue");

class TransactionQueue extends BaseQueue {
    constructor() {
        super(QUEUE_NAME.TRANSACTION_QUEUE);
        this.register();
    }

    register(){
        super.register()
    }

}

module.exports = TransactionQueue;
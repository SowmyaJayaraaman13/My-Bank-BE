const { QUEUE_NAME } = require("../../../constants/queue");
const { syncTransactionToMongoDB } = require("../../../helpers/transaction");
const BaseSubscriber = require("./baseSubscriber");


class TransactionSubscriber extends BaseSubscriber {
    constructor(){
        super(QUEUE_NAME.TRANSACTION_QUEUE);
        this.register();
    }

    register(){
        super.register(this)
    }

    syncTransaction(data){
        syncTransactionToMongoDB(data)
    }
}

module.exports = TransactionSubscriber
const { QUEUE_NAME } = require("../../../constants/queue");
const BaseQueue = require("./baseQueue");

class EmailQueue extends BaseQueue {
    constructor() {
        super(QUEUE_NAME.EMAIL_QUEUE);
        this.register();
    }

    register(){
        super.register()
    }

}

module.exports = EmailQueue;
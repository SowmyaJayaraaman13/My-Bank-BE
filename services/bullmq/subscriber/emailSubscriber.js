const { QUEUE_NAME } = require("../../../constants/queue");
const { emailService } = require("../../email");
const BaseSubscriber = require("./baseSubscriber");


class EmailSubscriber extends BaseSubscriber {
    constructor(){
        super(QUEUE_NAME.EMAIL_QUEUE);
        this.register();
    }

    register(){
        super.register(this)
    }

    sendEmail(data){
        emailService.send(data)
    }
}

module.exports = EmailSubscriber
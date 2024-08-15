const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.client = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_ADDRESS,
              pass: process.env.GMAIL_PASSWORD
            }
          });
    }

    send(emailDetails) {
        try {
            this.client.sendMail({
                from: process.env.GMAIL_ADDRESS,
                to: "ramamoorthy0811@gmail.com",
                subject: "This is test content",
                ...emailDetails
            });
        } catch (error){
            console.log(`Error while Sending Email -> `, error);
            throw error
        }
    }
}

const emailService = new EmailService();

module.exports = {
    emailService
}
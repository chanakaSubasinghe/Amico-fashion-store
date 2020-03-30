const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const sendWelcomeEmail = (email) => {
    sgMail.send({
        to: email,
        from: 'amicosrilanka@gmail.com',
        subject: 'New login account for Amico Sri Lanka',
        text: `Ayubowan! we have created an account for you to login to application.`
    });
};

const sendGoodByeEmail = (email) => {
    sgMail.send({
        to: email,
        from: 'amicosrilanka@gmail.com',
        subject: 'Your account has been deleted!',
        text: `Ayubowan! we have deleted your account because of some reasons. please contact admin to create an account`
    })
}

module.exports = {sendWelcomeEmail, sendGoodByeEmail}

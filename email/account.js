// importing dependencies
const sgMail = require('@sendgrid/mail')

// configure with API key
sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

// send welcome email function
const sendWelcomeEmail = (email) => {
    sgMail.send({
        to: email,
        from: 'amicosrilanka@gmail.com',
        subject: 'New login account for Amico Sri Lanka',
        html: '<h1>Ayubowan!</h1> <br />' +
            '<h2>we have created an amico account for you to manage items in our stock.</h2> <br />' +
            '<div>provide your email and password, <b>type amico123# as the password when you logging first time</b></div>, <br />' +
            '<div>when you logged in, <b>do not forget to change your password!<b/></div>, <br />' +
            'you can take login from following link, <br />' +
            'https://amico-lk.herokuapp.com/login'
    });
};

// send bye email function
const sendGoodByeEmail = (email) => {
    sgMail.send({
        to: email,
        from: 'amicosrilanka@gmail.com',
        subject: 'Your account has been deleted!',
        html: '<h1>Ayubowan!</h1> <br />' +
            `<h3>we have deleted your account because of some reasons. this action is totally based on administrator's decision</h3>` +
            '<b>Thank you for being a store manager of Amico :)</b>'
    })
}

// exporting these two functions
module.exports = { sendWelcomeEmail, sendGoodByeEmail }

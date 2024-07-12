const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: 'hardiknjms21@gmail.com',
      pass: 'faqv gtgz myfv jgbu',
    }
})


let errorCode = 500
let errorMessage = "Something went wrong"
function sendMail(req, res) {

    try {
        const {email, id} = req.body

        console.log(email)
        
        if(!email){
            errorCode = 403
            errorMessage = "Report Failed: bad request"
            throw new Error
        }

        if(!id){
            errorCode = 403
            errorMessage = "Report Failed: bad request"
            throw new Error
        }

    
        const content = "Someone has reported fake document. Someone is trying to create fake document by using document: "  + id
    
        const mailOptions = {
            from: 'hardiknjms21@gmail.com',
            to: email,
            subject: 'Document Forgery Reported',
            text: content,
          
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                errorCode = 500
                errorMessage = "Report Failed: something went wrong"
                throw new Error
            } else {
              res
              .status(200)
              .json({message: "Email Sent"})
            }
          });

    } catch (error) {
        res.status(errorCode).json({
            errorMessage
        })
    }

}

module.exports = {sendMail}
const nodemailer = require("nodemailer");


let emailadapter = (options) => {

   let getUserEmail=(user) => {
        let email = user.get('email') || user.get('username');

        if (options.emailField) {
            email = user.get(options.emailField);
        }

        return email;
    };

   
    
   let sendMail= (mail) => {
        let mailOptions = {
            to: mail.to,
            html: mail.text,
            subject: mail.subject,
            from: options.user
        };
        

        

        // create reusable transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            "host": options.host,
            "port": options.port,
            "secureConnection": options.secureConnection, // use SSL
            "auth": {
                "user": options.user, // user name
                "pass": options.pass        // password
            }
        });

       


           transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                   
                } else {
                    console.log(info)
                }
            })
        



    };
  let sendVerificationEmail=(data) => {
      
        let mail = {
            subject: '邮箱验证',
            to: getUserEmail(data.user)
        };
        mail.text = data.link;
        return sendMail(mail);
    };

   let sendPasswordResetEmail = (data) => {
        let mail = {
            subject: '重置密码',
            to: getUserEmail(data.user)
        };
        mail.text = data.link;
        return sendMail(mail);
    };

    return Object.freeze({
        sendVerificationEmail:sendVerificationEmail,
        sendPasswordResetEmail: sendPasswordResetEmail,
        sendMail: sendMail
    });
}

module.exports = emailadapter;
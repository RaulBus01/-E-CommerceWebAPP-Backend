const nodemailer = require('nodemailer');

exports.verifyEmail = async(email, link) => {
    try{
        
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: process.env.USER,
                pass: process.env.PASSWORD, 
            },
        });
       
        let info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Email verification",
            text: "Welcome",
            html:`
            <div>
                <a href=${link}>Click here to activate your account!</a>
            </div>
            `      
        });
        console.log("email sent!");
    } catch(error){
        console.log(error);
    }
}
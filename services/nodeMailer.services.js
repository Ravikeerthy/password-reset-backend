import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const mailService = async(mailreceiver, message)=>{
    let mailTransporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})
let details = {
    from:process.env.EMAIL_USER,
    to:mailreceiver,
    subject:"Password Reset",
    html:message
}

const info = await mailTransporter.sendMail(details, (err) =>{
    if(err){
        console.log("Check Credentials");
    }else{
        console.log("Mail sent successfully", info.response);
    }
})

}


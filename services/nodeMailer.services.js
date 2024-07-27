import nodemailer from 'nodemailer';

const mailService = ()=>{
    let mailTransporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"ravikeerthy1807@gmail.com",
        pass:"lqhi ngjl alfh hmpy"
    }
})
let details = {
    from:"ravikeerthy1807@gmail.com",
    to:"ravikeerthy1807@gmail.com",
    subject:"Login Message",
    text:"Login Successfully"
}

mailTransporter.sendMail(details, (err) =>{
    if(err){
        console.log("Check Credentials");
    }else{
        console.log("Mail sent successfully");
    }
})

}

export default mailService; 
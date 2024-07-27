import User from "../models/user.schema.js";
import bcryptjs from 'bcryptjs'
import {mailService} from "../services/nodeMailer.services.js";
import { GenerateStringRandomly } from "../services/randomString.js";

export const userRegister = async(req, res) =>{
    try {
        const {firstName, lastName, email, password, contactNumber} = req.body;
        const hashPassword = await bcryptjs.hash(password, 10);
        console.log(hashPassword);
        
        const newUser = new User({firstName, lastName, email,password:hashPassword, contactNumber});
        await newUser.save();

        res.status(200).json({message:"User Register is Successfully"})
    } catch (error) {
        res.status(500).json({error:"Error in Registeration"})
    }
}

export const userLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
           return res.status(401).json({error:"Email is not valid"})
        }
        
        const passwordMatch = await bcryptjs.compare(password, user.password)

        if(!passwordMatch){
            return res.status(401).json({error:"Invalid Password"});
        }
       
        res.status(200).json({message:"Login Successfully"})
    } catch (error) {
        res.status(500).json({error:"Error in Login"})
    }
}

export const getAllUser = async(req, res) =>{
    try {
        const userDetails = await User.find();
        res.status(200).json({message:"Fetched all Users", userDetails:userDetails}); 
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
  
}

export const forgetPassword = async(req, res) =>{
    try {
        const findEmail = await User.findOne({email: req.body.email});
        if(findEmail && req.body.email !==''){
            const randomString = GenerateStringRandomly(20);
            const mailId = req.body.email;
            const resetLink = `${process.env.Reset_Link}?token= ${randomString}$email=${mailId}`;

            const message =
                `<h6> Hello ${findEmail.firstName},</h6>
                 <p>You have requested to reset your password. Click the link below to reset it:</p>
                <a href="${resetLink}">                 
                    Reset Your Password                 
                </a>
                `;
                mailService(req.body.email, message);
            res.status(200).send({message:"Reset link sent to your mail-Id ", data:resetLink});

        }else{
            res.status(400).send({message:"user does not exist"})
        }    

    } catch (error) {
        res.status(500).json({error:"internal server error" })
    }
}

export const resetPassword = async(req, res) =>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            const password = req.body.password;
            const confirmPassword = req.body.confirmPassword;
            const equalPassword = password === confirmPassword;
            const hashPassword = await bcryptjs.hash(password, 10);
            if(equalPassword && password !== '' && confirmPassword !==''){
                await User.updateOne(
                    {email:req.body.email},
                    {password:hashPassword}
                );
                await User.updateOne(
                    {email:req.body.email},
                    {$unset:{randomString:1}}
                );
                res.status(200).send({message:"New Password is updated successfully"})
            }else{
                res.status(400).send({message:"Password and confirm password Does not match"})
            }
            }else{
                res.status(404).send({ message: "User does not exist" });

        }
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
}

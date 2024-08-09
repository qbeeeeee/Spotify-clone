import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";

const signUp = async (req,res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        let check = await userModel.findOne({email:req.body.email});
        if(check){
            return res.status(400).json({success:false,errors:"Email Already Exists"});
        }
        let likedSongs = {};
        for (let i = 0; i < 300; i++) {
            likedSongs[i]=0;
        }
        let likedAlbums = {};
        for (let i = 0; i < 300; i++) {
            likedAlbums[i]=0;
        }

        const userData = {
            name,
            email,
            password,
            likedSongs:likedSongs,
            likedAlbums:likedAlbums
        }

        const user = userModel(userData);
        await user.save();

        const data = {
            user:{
                id:user.id
            }
        }
    
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
    } catch (error) {
        res.json({success: false, error:error.message});
    }
}

const logIn = async (req,res) => {
    let user = await userModel.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email ID"});
    }
}

export {signUp, logIn}
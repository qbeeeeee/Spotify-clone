import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js'
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import artistRouter from './src/routes/artistRoute.js';
import userRouter from './src/routes/userRoute.js';
import jwt from "jsonwebtoken";
import userModel from './src/models/userModel.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// initialize routes
app.use("/api/song",songRouter)
app.use("/api/album",albumRouter)
app.use("/api/artist",artistRouter)
app.use("/api/user",userRouter)

const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"});
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using valid token"});
        }
    }
}

app.post('/api/likedsongs/add',fetchUser, async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await userModel.findOne({_id:req.user.id});
    if(userData.likedSongs[req.body.itemId]>=1){
        return
    }
    userData.likedSongs[req.body.itemId] += 1;
    await userModel.findOneAndUpdate({_id:req.user.id},{likedSongs:userData.likedSongs});
    res.send("Added");
})

app.post('/api/likedsongs/remove', fetchUser, async (req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData = await userModel.findOne({_id:req.user.id});
    if(userData.likedSongs[req.body.itemId]>0){
        userData.likedSongs[req.body.itemId] -= 1;
    }
    await userModel.findOneAndUpdate({_id:req.user.id},{likedSongs:userData.likedSongs});
    res.send("Removed");
})

app.post('/api/likedsongs/getlikedsongs', fetchUser, async (req,res)=>{
    let userData = await userModel.findOne({_id:req.user.id});
    res.json(userData.likedSongs);
})

app.post('/api/likedalbums/add',fetchUser, async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await userModel.findOne({_id:req.user.id});
    if(userData.likedAlbums[req.body.itemId]>=1){
        return
    }
    userData.likedAlbums[req.body.itemId] += 1;
    await userModel.findOneAndUpdate({_id:req.user.id},{likedAlbums:userData.likedAlbums});
    res.send("Added");
})

app.post('/api/likedalbums/remove', fetchUser, async (req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData = await userModel.findOne({_id:req.user.id});
    if(userData.likedAlbums[req.body.itemId]>0){
        userData.likedAlbums[req.body.itemId] -= 1;
    }
    await userModel.findOneAndUpdate({_id:req.user.id},{likedAlbums:userData.likedAlbums});
    res.send("Removed");
})

app.post('/api/likedalbums/getlikedalbums', fetchUser, async (req,res)=>{
    let userData = await userModel.findOne({_id:req.user.id});
    res.json(userData.likedAlbums);
})

app.get('/',(req,res)=> res.send("API Working"))

app.listen(port, ()=>console.log(`Server started on ${port}`))
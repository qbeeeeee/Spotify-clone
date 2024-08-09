import {v2 as cloudinary} from 'cloudinary'
import artistModel from '../models/artistModel.js'

const addArtist = async (req,res) => {
    try {
        const name = req.body.name;
        const genre = req.body.genre;
        const listeners = req.body.listeners;
        const bgColour = req.body.bgColour;
        const desc = req.body.desc;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        
        const artistData = {
            name,
            genre,
            listeners,
            bgColour,
            desc,
            image: imageUpload.secure_url
        }

        const artist = artistModel(artistData);
        await artist.save();

        res.json({success: true,message:"Artist added"})
    
    } catch (error) {
        res.json({success: false})
    }
}

const listArtist = async (req,res) => {
    try {
        const allArtist = await artistModel.find({});
        res.json({success:true , artist: allArtist});
    } catch (error) {
        res.json({success:false});
    }
}

const removeArtist = async (req,res) => {
    try {
        await artistModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Artist removed"});
    } catch (error) {
        res.json({success:false});
    }
}

export {addArtist,listArtist,removeArtist}
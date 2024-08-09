import {v2 as cloudinary} from 'cloudinary'
import albumModel from '../models/albumModel.js'

const addAlbum = async (req,res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const artist = req.body.artist;

        let albums = await albumModel.find({});
        let id;
        if(albums.length>0){
            let last_album_array = albums.slice(-1);
            let last_album = last_album_array[0];
            id = last_album.id+1;
        }
        else{
            id=1;
        }
        
        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url,
            artist,
            id:id
        }

        const album = albumModel(albumData);
        await album.save();

        res.json({success: true,message:"Album added"})
    
    } catch (error) {
        res.json({success: false})
    }
}

const listAlbum = async (req,res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.json({success:true , albums: allAlbums});
    } catch (error) {
        res.json({success:false});
    }
}

const removeAlbum = async (req,res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Album removed"});
    } catch (error) {
        res.json({success:false});
    }
}

export {addAlbum,listAlbum,removeAlbum}
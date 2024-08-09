import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    likedSongs: { type: Object, required: true },
    likedAlbums: { type: Object, required: true },
})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;
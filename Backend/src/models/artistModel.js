import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    listeners: { type: String, required: true },
    bgColour: { type: String, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true},
})

const artistModel = mongoose.models.artist || mongoose.model("artist",artistSchema);

export default artistModel;
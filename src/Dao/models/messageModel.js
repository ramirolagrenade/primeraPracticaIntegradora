import mongoose from "mongoose"

const collection = "message"

const messageSchema = mongoose.Schema({
    user:{
        type: String,
        require: true
    }, 
    message:{
        type: String,
        require: true
    }
})

const mesageModel = mongoose.model(collection, messageSchema)

export default mesageModel
// name
// email
// password
// chat : CHAT[]

import mongoose, { mongo } from "mongoose";
import { randomUUID } from "node:crypto";

const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: new mongoose.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        email: ['user', 'assistant'],
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+.\S+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    chat: [chatSchema]
})


export default mongoose.model('User',userSchema);
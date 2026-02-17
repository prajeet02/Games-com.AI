import { connect } from 'mongoose';
export default async function connectToDb(){
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
        throw new Error ("Cannot Connect To MongoDB")
    }
}


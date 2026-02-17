import dotenv from 'dotenv';
dotenv.config();

import app from "./app.js"
import connectToDb from "./db/connection.js"

const PORT = process.env.PORT || 5001

connectToDb().then(() => {
   app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}, Database is also connected`)
   })
}).catch((err) => {
  console.log(err);
})






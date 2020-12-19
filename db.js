import mongoose from "mongoose";  //npm install mongoos
import dotenv from "dotenv";     //dotenv 설치 npm install dotenv 데이터베이스 위치를 .env에숨겨줌
dotenv.config();         


mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology: true
    }
);


const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB")
const handleError = (error) => console.log(`❌ Error on DB Connection:${error}`)

db.once("open", handleOpen)
db.on("error", handleError)
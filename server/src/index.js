import { connectDb } from "./db/index.js";
import { config } from "dotenv";
import app from "./app.js";

config({
    path: "./.env"
})

connectDb()
.then(()=>{
    app.on("error", (err) => {
        console.error("Server error:", err);
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.error("connection to database failed ", err) 
})
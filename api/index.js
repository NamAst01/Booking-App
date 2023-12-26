import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser" ;
import cors from "cors" ;

dotenv.config()

const app = express()
//If your using express in your node server just add
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to Mongoose!");
    })
    .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
})
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

app.get("/", (req, res) => {
    res.send("")
})

//middleware

app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", usersRoute)
app.use("/api/v1/rooms", roomsRoute)
app.use("/api/v1/hotels", hotelsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, () => {
    console.log("Running!")
})
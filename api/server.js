import express from "express";
import db from './db.js'
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import orderRoute from "./routes/orderRoute.js";
import messageRoute from "./routes/messageRoute.js";
import gigRoute from "./routes/gigRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import authRoute from "./routes/authRoute.js"
import cookieParser from "cookie-parser";


const app = express();
const port = process.env.PORT || 5000
db();

app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next)=>{

    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).send(errorMessage);
});

app.get("/", (req, res)=>{
    res.send("I dey o!")
})

app.listen(port, ()=> {
    console.log(`Server connection on port ${port}`);
})
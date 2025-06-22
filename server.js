import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./DataBase/DB.js";
import cors from "cors"
import userRoutes from "./routes/userRoute.route.js"
import videoRoutes from "./routes/videoRoute.route.js"
import channelRoutes from "./routes/channelRoute.route.js"
import commentRoutes from "./routes/commentRoute.route.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

connectDB();

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/videos", videoRoutes)
app.use("/api/v1/channels", channelRoutes)
app.use("/api/v1/comments", commentRoutes)



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on PORT: http://localhost:${PORT}`);
});
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./DataBase/DB.js";

dotenv.config();
const app = express();


connectDB();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get("/", (req, res) => {
    res.send("Welcome to Youtube-Clone Backend API")
})


const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
    console.log(`Server running on PORT: http://localhost:${PORT}`);
});
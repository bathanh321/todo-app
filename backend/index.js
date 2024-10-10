const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const todoRoutes = require("./routes/Todos");

const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "Bad JSON" });
    }
    next(err);
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(cors());
app.use(cookieParser())
app.use(express.json())


//routes
app.use("/", todoRoutes);



const hostname = 'localhost'
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server starts at http://${hostname}:${port}/`)
})
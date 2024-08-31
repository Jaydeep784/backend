const express = require('express');
const { mongoose } = require('mongoose');
const productRoute = require('./routes/Product');
const userRoute = require('./routes/User');
const cors = require("cors");
const app = express();
app.use(cors({
    origin : ['https://marketplace-client-nu.vercel.app'],
    methods : ['GET', 'POST'],
    credentials : true
}));
const PORT = process.env.PORT || 3001;

// jIzY5YNhlxFtFxoj
// mongodb+srv://jaydeepjadhav784:jIzY5YNhlxFtFxoj@cluster0.72qwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(express.urlencoded({ extended: false }));
app.use(express.json());    

mongoose.connect('mongodb+srv://jaydeepjadhav784:jIzY5YNhlxFtFxoj@cluster0.72qwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("Database connected")).catch((e) => console.log(e));

app.use('/', productRoute);
app.use("/", userRoute);
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})
require("dotenv").config();

const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

// set the view engine to ejs
app.set('view engine', 'ejs');

//Test Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

//Main Routes
app.use("/api/item", require("./routes/item"));
app.use("/api/imageUpload", require("./routes/uploadMedia"));
app.use("/api/deleteImage", require("./routes/deleteMedia"));


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("App running on port 5000");
});



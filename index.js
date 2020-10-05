require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./database");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world");
});

// app.route("/books/:userId").get(function (req, res, next) {
//   connection.query(
//     "SELECT * FROM `books` WHERE userId = ? LIMIT 3",
//     req.params.userId,
//     function (error, results, fields) {
//       if (error) throw error;
//       res.json(results);
//     }
//   );
// });

app.listen(5000, () => {
    console.log("Running on port 5000");
});

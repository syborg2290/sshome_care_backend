require("dotenv").config();

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
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

const server = http.createServer(app);
const io = socketio(server);
const connectionDb = require("./database");

//Test Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

//Main Routes
app.use("/api/item", require("./routes/item"));
app.use("/api/imageUpload", require("./routes/uploadMedia"));
app.use("/api/deleteImage", require("./routes/deleteMedia"));

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getItems(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     connectionDb.end();
//     clearInterval(interval);
//   });
// });

// const getItems = (socket) => {
//   var sql = "SELECT * FROM item";
//   connectionDb.query(sql, function (err, results) {
//     if (err) {
//       throw err;
//     }
//     socket.emit("fetchItems", results);
//   });
// };

io.on("connection", function (socket) {
  socket.on("fetchItems", () => {
    var sql = "SELECT * FROM item";
    connectionDb.query(sql, function (err, results) {
      if (err) {
        throw err;
      }
      io.emit("messageFromServer", results);
    });
  });
});


const port1 = process.env.PORT || 5000;
const port2 = process.env.PORT || 4000;

app.listen(port1, () => {
  console.log("App running on port 5000");
});

server.listen(port2, () => {
  console.log("Server running on port 4000");
});

const express = require("express");

const route = require("./route"); 
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Эdddтrrrо ddтольео мой миг");
});

app.use(cors({ origin: "*" }));
// app.use(route);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    console.log(name, room);
    socket.join(room);

    socket.emit("message", {
      data: {
        user: { name: "Admin" },
        message: `Hey ${name}`,
      },
    });
  });
  io.on("dissconnect", () => {
    console.log("dissconnect");
  });
});

server.listen(5000, () => {
  console.log("Server is runnin g 5000");
});
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const gameFct = require("./js/game.js");

const io = new Server({
  cors: {
    origin: process.env.CLIENT_HOST,
  },
});

io.listen(server);
server.listen(process.env.SOCKET_PORT);

const game = gameFct.create(() => {
  io.emit("game", game.getData());
});

io.on("connection", (socket) => {
  socket.on("getGame", () => {
    io.emit("game", game.getData());
  });

  socket.on("startGame", (user) => {
    if (!game.isStarted()) {
      game.start();
    }
    game.join(user);
    io.emit("game", game.getData());
  });

  socket.on("restart", () => {
    game.restart();
    io.emit("game", game.getData());
  });

  socket.on("selected", (data) => {
    if (game.isStarted()) {
      game.setSelection(data?.selected, data?.user?._id);
    }
    io.emit("game", game.getData());
  });
});

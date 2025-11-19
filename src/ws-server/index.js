// ws-server/index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  // send a welcome notification
  socket.emit("notification", {
    id: Date.now(),
    title: "Welcome",
    message: "Admin panel connected to real-time server",
    level: "info",
    createdAt: new Date().toISOString(),
  });

  // periodic notifications (demo)
  let counter = 1;
  const notifInterval = setInterval(() => {
    socket.emit("notification", {
      id: Date.now() + counter,
      title: `Demo notice #${counter}`,
      message: `This is a demo notification ${counter}`,
      level: counter % 2 ? "info" : "success",
      createdAt: new Date().toISOString(),
    });
    counter += 1;
  }, 25000); // every 25s

  // emit chart update every 8s (mock)
  const chartInterval = setInterval(() => {
    const months = ["Jul", "Aug", "Sep", "Oct", "Nov"];
    const users = Math.floor(1000 + Math.random() * 3000);
    const revenue = Math.floor(5000 + Math.random() * 22000);
    socket.emit("chart:update", {
      time: new Date().toISOString(),
      usersPoint: { month: months[Math.floor(Math.random() * months.length)], users },
      revenuePoint: { month: months[Math.floor(Math.random() * months.length)], revenue },
    });
  }, 8000);

  socket.on("disconnect", () => {
    console.log("client disconnected", socket.id);
    clearInterval(notifInterval);
    clearInterval(chartInterval);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("WS server running on port", PORT));

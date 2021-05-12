const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: "*" });
const { validationResult, check } = require("express-validator");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send();
});

server.listen(4000, () => {
  console.log("running");
});

io.on("connection", (socket) => {
  let users = [];

  socket.on("joinroom", (data) => {
    socket.join(data.room);
    users.push({ name: data.name, room: data.room });

    socket.emit("message", {
      name: data.name,
      message: `Welcome ${data.name}`,
      notification: true,
    });
    // socket.emit("me", {
    //   name: data.name,
    //   message: data.message,
    //   notification: false,
    // });
  });
  // socket.on("chat", ({ room, message, name }) => {
  //   console.log("chat");
  //   socket.broadcast.to(room).emit("recieve-message", { room, message, name });
  // });
  socket.on("test", ({ room, message, name }) => {
    console.log("emmited");
    socket.broadcast.emit("recieve-message", { room, message, name });
    // io.to(room).emit("message");
  });
  socket.on("disconnect", () => {});
});

// app.get(
//   "/createroom",
//   [check("code").isNumeric(), check("name").isString()],
//   (res, req) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     const { code } = req.body;

//     try {
//     } catch (err) {}
//   },
// );

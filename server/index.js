const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const codeRoutes = require("./routes/codeRouter");
const { log } = require("console");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/code", codeRoutes);

const PORT = 3001;
const MAX_STUDENTS = 1;

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const connectedMentors = {
  "code-block-1": null,
  "code-block-2": null,
  "code-block-3": null,
  "code-block-4": null,
};

// Store the socket ids of the clients connected to each code block
const connectedClients = {
  "code-block-1": [],
  "code-block-2": [],
  "code-block-3": [],
  "code-block-4": [],
};

const addClientToClass = (codeBlockId, socketId) => {
  // If there is no mentor connected to the code block, the first client to join will be the mentor
  if (!connectedMentors[codeBlockId]) {
    connectedMentors[codeBlockId] = socketId;
    console.log(
      "A mentor joined a room: ",
      codeBlockId + "id:",
      connectedMentors[codeBlockId]
    );
  } else {
    // If there is already a mentor connected, the client will be added to the list of clients
    if (connectedClients[codeBlockId].length < MAX_STUDENTS) {
      connectedClients[codeBlockId].push(socketId);
      console.log(
        "A student joined a room ",
        codeBlockId + "id:",
        connectedClients[codeBlockId]
      );
    } else {
      console.log(
        "Maximum number of students reached for code block ",
        codeBlockId
      );
      // Optionally, you can emit a message to the client indicating that the class is full.
      io.to(socketId).emit("classFull");
    }
  }
};

const removeClientFromClass = (codeBlockId, socketId) => {
  if (connectedMentors[codeBlockId] === socketId) {
    connectedMentors[codeBlockId] = null;
  } else {
    console.log("in remove client with code block,", codeBlockId);
    console.log("in remove client with socketId,", socketId);
    console.log(
      "in remove client with connectedClients[codeBlockId],",
      connectedClients[codeBlockId]
    );
    connectedClients[codeBlockId] = connectedClients[codeBlockId].filter(
      (id) => id !== socketId
    );
  }
};

// Socket.io connection event
io.on("connection", (socket) => {
  console.log("A new user connected");

  socket.on("join", ({ id }) => {
    console.log("A user joined a room ", id);
    addClientToClass(id, socket.id);
    const isMentor = connectedMentors[id] === socket.id;
    socket.emit("role", { isMentor });
    isMentor &&
      io
        .to(connectedClients[id][0])
        .emit("mentorJoin", { message: "Mentor joined the room" });

    !isMentor &&
      io
        .to(connectedMentors[id])
        .emit("studentJoin", { message: "Student joined the room" });
  });
  // Handle socket events here

  socket.on("newCode", ({ id, code }) => {
    console.log("New code from client: ", code);
    // Send the new code to relevent Mentor
    const mentorSocketId = connectedMentors[id];
    io.to(mentorSocketId).emit("newCodeOfStudent", code);
  });

  socket.on("leave", ({ id }) => {
    console.log("A user left a room ", id);

    const isMentor = connectedMentors[id] === socket.id;
    isMentor &&
      io
        .to(connectedClients[id][0])
        .emit("mentorLeave", { message: "Mentor left the room" });

    !isMentor &&
      io
        .to(connectedMentors[id])
        .emit("studentLeave", { message: "Student left the room" });
    removeClientFromClass(id, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Server is runing on port 3001..");
});

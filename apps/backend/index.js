require("dotenv").config();
const { Game } = require("./models/game");
const Chess = require("./game_logic/chess");

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const morgan = require("morgan");
const cors = require("cors");
const { uploadToIpfs } = require("./utils/uploadToIpfs");
const axios = require("axios");
const sendEpnsNotif = require("./epns");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

const chess = new Chess();

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

app.get("/", (req, res) => {
  res.send("Welcome to gameday");
});

app.post("/api/games", async (request, response, next) => {
  const game = new Game({
    moveHistory: [],
    status: { result: "undecided", score: "undecided" },
  });
  try {
    const savedGame = await game.save();
    response.json(savedGame);
  } catch (error) {
    console.log("Unable to create game");
    next(error);
  }
});

app.get("/api/games/:id/moves", async (request, response, next) => {
  try {
    const game = await Game.findById({ _id: request.params.id });
    response.json(game);
  } catch (error) {
    console.log("Unable to get game");
    next(error);
  }
});

app.post("/api/games/:id/moves", async (request, response, next) => {
  const move = {
    piece: request.body.piece,
    from: request.body.from,
    to: request.body.to,
  };

  if (request.body.promotion) {
    move.promotion = request.body.promotion;
  }

  try {
    const game = await Game.findById(request.params.id);
    const currentBoard = chess.createBoardFromMoveHistory(game.moveHistory);
    const isPlayableMove = chess.isPlayableMove(currentBoard, move);
    if (isPlayableMove) {
      try {
        const fullMove = chess.getFullMove(currentBoard, move);
        const updatedGame = await Game.findByIdAndUpdate(
          request.params.id,
          { $push: { moveHistory: fullMove } },
          { new: true, runValidators: true }
        );
        response.json(updatedGame);
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    console.log("Unable to validate move");
    next(error);
  }
});

app.patch("/api/games/:id/result", async (request, response, next) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      request.params.id,
      { status: request.body },
      { new: true }
    );
    console.log("updated game", updatedGame);
    response.json(updatedGame);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.delete("/api/games/:id/moves", async (request, response, next) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      request.params.id,
      { $pop: { moveHistory: 1 } },
      { new: true }
    );
    console.log("updated game", updatedGame);
    response.json(updatedGame);
  } catch (error) {
    next(error);
  }
});

app.post("/ipfs/upload", async (_req, res) => {
  const data = {
    player1: "axit",
    player2: "anj",
  };

  const result = await uploadToIpfs(data);

  res.status(200).send({ msg: "Success", result });
});

app.post("/ipfs/download", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://dweb.link/ipfs/bafybeicst2hbuu56jfq7iagawgfb47uuwly7n26dhoknvo5eaclbme324i/result.json",
    };

    const { data } = await axios.request(options);

    return res.status(200).send({ msg: "Success", data });
  } catch (error) {
    console.log({ error });

    return res.status(500).send({ msg: "Internal Server Error", error });
  }
});

app.post("/epns/send-notif", async (req, res) => {
  const { body } = req;

  try {
    const result = await sendEpnsNotif(body);

    console.log({ result });

    return res.status(200).send({ msg: "Success", data: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ msg: "Internal Server Error", error });
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = process.env.PORT || 3001;
server.listen(PORT);
console.log(`Server running on port ${PORT}`);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("createdGame", async (gameData) => {
    socket.join(gameData.id);
  });

  socket.on("joinGame", async (gameID) => {
    console.log("joining game:", gameID);
    socket.join(gameID);
  });

  socket.on("requestJoinGame", async (gameID) => {
    console.log("attempting to join game:", gameID);
    const playersInGame = io.sockets.adapter.rooms.get(gameID);
    if (playersInGame) {
      if (playersInGame.size === 2) {
        socket.to(socket.id).emit("gameFull");
      }
      if (playersInGame.size === 1) {
        const [first] = playersInGame;
        io.to(first).emit("requestColor", socket.id);
      }
    }
    socket.join(gameID);
  });

  socket.on("assignColor", async (playerData) => {
    console.log("assigning color");
    const { playerID, gameID, color } = playerData;
    io.to(playerID).emit("joinGame", { id: gameID, color });
  });

  socket.on("leftGame", async (roomToLeave) => {
    socket.leave(roomToLeave);
    console.log("leaving room:" + roomToLeave);
  });

  socket.on("update", async (room) => {
    socket.to(room).emit("gameUpdate");
  });

  socket.on("resign", async (room) => {
    socket.to(room).emit("opponentResigned");
  });
});

// sendEpnsNotif();

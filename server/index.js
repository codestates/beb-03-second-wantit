const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000/"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH"],
  })
);

app.get("/", (req, res) => {
  res.send("wantit Backend Server");
});

app.use("/users", usersRouter);
app.use("/post", postRouter);

server = app.listen(4000);
console.log("http server runnning!!");

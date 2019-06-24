const express = require("express");
const app = express();
const Radis = require("./utils/RedisConnect");

app.use(express.json());

var cors = require("cors");

app.use(cors());
app.use("/", (req, res, next) => {
  const client = Radis();
  req.redis = client;
  next();
});
app.use("/auth", require("./routes/login"));
app.use("/tweet", require("./routes/tweet"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started at ${PORT}`));

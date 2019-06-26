const express = require("express");
const app = express();
const radisStore = require("./utils/RedisConnect");
const authTool = require("./utils/AuthTool");
const morgan = require("morgan");
const createError = require("http-errors");
app.use(express.json());

var cors = require("cors");

if (process.env.NODE_ENV.trim() === "development") {
  app.use(require("./utils/logglyMiddleware.dev"));
}

if (process.env.NODE_ENV.trim() === "development") {
  app.use(morgan("common"));
}

app.use(cors());

app.use("/auth", radisStore, require("./routes/login"));
app.use("/tweet", authTool, require("./routes/tweet"));
app.use("/message", authTool, require("./routes/messageBoard"));

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
  require("./utils/MongoConnect");
});

const express = require("express");
const app = express();
const radisStore = require("./utils/RedisConnect");
const authTool = require("./utils/AuthTool");
app.use(express.json());

var cors = require("cors");

app.use(cors());

app.use("/auth", radisStore, require("./routes/login"));
app.use("/tweet", authTool, require("./routes/tweet"));
app.use("/message", authTool, require("./routes/messageBoard"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
  require("./utils/MongoConnect");
});

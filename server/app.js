const express = require("express");
const app = express();
app.use(express.json());
var cors = require("cors");

app.use(cors());
app.use((req, res, next) => {
  console.log("Time");
  next(); // 传递request对象给下一个中间件
});
app.use("/auth", require("./routes/twitter"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started at ${PORT}`));

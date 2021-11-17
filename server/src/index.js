const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/files", express.static("files"));
require("./config/mongoose.js")(app);
require("../src/routeHandler")(app);

app.get("/", (req, res) => {
  res.json({
    message: "Hello and Welcome",
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application is running on ${port}`);
});

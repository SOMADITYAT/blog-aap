const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user", userRoutes);

// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: "Node server",
//   });
// });

const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(
    `Server running ${process.env.DEV_MODE} on port 8080 ${PORT}`.bgCyan.white
  );
});

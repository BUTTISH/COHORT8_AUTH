require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");
const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

const port = process.env.PORT || 3333;
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("Connecting Error:", error));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Server is active");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

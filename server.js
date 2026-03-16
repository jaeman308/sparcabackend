const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const boardRouter = require("./controllers/boards");
const nodeRouter = require("./controllers/node");
const connectionRouter = require("./controllers/connection");
const taskRouter = require("./controllers/tasks");
const budgetRouter = require("./controllers/budgetList");
const authRequired = require("./middleware/authRequired");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`) 
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use("/boards",authRequired, boardRouter);
app.use("/nodes",authRequired, nodeRouter);
app.use("/connections",authRequired, connectionRouter);
app.use("/tasks",authRequired, taskRouter);
app.use("/budget",authRequired, budgetRouter);
app.use("/auth", require("./controllers/auth"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
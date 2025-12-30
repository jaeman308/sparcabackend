const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const boardRouter = require("./controllers/boards");
// const taskRouter = require("./controllers/tasks");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`) 
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use("/boards", boardRouter);
// app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const jwt = require("jsonwebtoken");

const port = process.env.PORT;
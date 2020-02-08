const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const {setupWebsocket} = require('./websocket');
require('dotenv').config();

const app = express();
const server = http.Server(app);
setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser:true, useUnifiedTopology:true });

server.listen(3333);
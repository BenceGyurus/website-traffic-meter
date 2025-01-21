const express = require('express');
const Functions = require('./functions');
const logger = require('./log');
const mongoose = require('mongoose');
const CookieMiddleware = require('./cookie');
const cookieParser = require('cookie-parser');
const getTraffic = require('./statistics/getTraffic');
const registration = require('./auth/registration');
const login = require('./auth/login');
const bodyParser = require('body-parser');
const verifyToken = require('./auth/verifyTokenMiddleware');

const config = Functions.openConfig();
if (!config){
    logger("Error reading config.json", "error");
    process.exit(1);
}

mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger(`Connected to MongoDB ${config.mongodb}`, 'info'))
  .catch((error) => {logger(`Error connecting to MongoDB ${config.mongodb}`, 'error'); process.exit(1)});

const app = express();
const port = config.port;

app.use(cookieParser());
app.use(bodyParser.json());

app.put('/traffic', async (req,res,next)=>await CookieMiddleware(req,res,next), async (req, res) => {
    res.send("ok")
});

app.get('/traffic', verifyToken , getTraffic);

app.post("/auth/register", registration);

app.post("/auth/login", login);

app.listen(port, () => {
  logger(`the server is listening at http://localhost:${port}`, "info");
})
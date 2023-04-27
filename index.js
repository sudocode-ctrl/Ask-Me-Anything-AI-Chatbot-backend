const express = require('express');
const dotenv = require('dotenv').config()
const connectToMongo = require('./db');
connectToMongo();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-vTZG3RTg64F6QQHV77M4NqJ8",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();



//ceate an express api that could call the function

const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors');
const searchController = require('./controllers/searchController');
const modelController = require('./controllers/modelController');
const router = require('./controllers/authController');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 5000;

app.use('/search', searchController)
// app.use('/auth', authController)
app.use('/model', modelController)
app.use('/auth', router)
app.use('/threads', require('./controllers/threadController'))

app.listen(port, () => {
    console.log('Example app listening at port:' + port);
});

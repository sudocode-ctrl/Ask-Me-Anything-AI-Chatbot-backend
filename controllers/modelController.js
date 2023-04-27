const modelController = require('express').Router()
const dotenv = require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-vTZG3RTg64F6QQHV77M4NqJ8",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
modelController.get('/models', async (req, res) => {
    try {
        const response = await openai.listEngines();
        // console.log(response.data.data)
        res.json({
            models: response.data
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = modelController
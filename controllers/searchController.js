const searchController = require('express').Router()
const dotenv = require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-vTZG3RTg64F6QQHV77M4NqJ8",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

searchController.post('/search', async (req, res) => {
    try {
        const { message, currentModel } = req.body;

        const response = await openai.createCompletion({
            model: `${currentModel}`, //"text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
        });

        res.json({
            message: response.data.choices[0].text
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }

});

module.exports = searchController

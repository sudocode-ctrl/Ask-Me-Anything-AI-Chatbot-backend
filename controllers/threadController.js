const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Thread = require('../models/threadModel')
const { body, validationResult } = require('express-validator');
// ROUTE1: Get all the Threads using : GET "/api/getuser"
router.get('/fetchallthreads', fetchuser, async (req, res) => {
    try {
        const threads = await Thread.find({ user: req.user.id });
        res.json(threads)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }

})
// ROUTE2: Add new thread using : GET "/api/addthread"
router.post('/addthread', fetchuser, async (req, res) => {

    try {


        const { name, threadArray } = req.body;
        // If there are errors then return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const thread = new Thread({
            name, threadArray, user: req.user.id
        })
        const savedThread = await thread.save();

        res.json(savedThread)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }
})

// ROUTE 3: Update an existing thread using PUT "/api/updatethread"
router.put('/updatethread/:id', fetchuser, async (req, res) => {
    const { threadArray } = req.body;
    // Create a newthread object
    try {


        const newThread = {};
        if (threadArray) { newThread.threadArray = threadArray };


        // Find the thread to be updated
        let thread = await Thread.findById(req.params.id);
        if (!thread) { return res.status(404).send("Not found") }

        if (thread.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed");

        }
        thread = await Thread.findByIdAndUpdate(req.params.id, { $set: newThread }, { new: true })
        res.json({ thread });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }
})

// ROUTE 4: Update an existing thread using DELETE "/api/deletethread" login required
router.delete('/deletethread/:id', fetchuser, async (req, res) => {

    try {

        // Find the thread to be deleted
        let thread = await Thread.findById(req.params.id);
        if (!thread) { return res.status(404).send("Not found") }
        // Allow deletion only if this thread belongs to user
        if (thread.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");

        }
        thread = await Thread.findByIdAndDelete(req.params.id)
        res.json({ "Success": "This thread has been deleted", thread: thread });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }
})


module.exports = router
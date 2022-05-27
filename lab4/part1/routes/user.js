const express = require('express')
const userModel = require('../models/user')
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const usr = await userModel.find({})
        res.json(usr)
    } catch (error) {
        res.status(500).json({
            "msg": "DB Error"
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const usr = await userModel.findById(req.params.id)
        res.json(usr)
    } catch (error) {
        res.status(404).json({
            "msg": "not found"
        })
    }
})

router.post("/", async (req, res) => {
    if (req.body.fName) {
        let user = new userModel({
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            dob: new Date()
        })

        try {
            const savedUser = await user.save()
            res.json(savedUser)
        } catch (error) {
            res.status(400).send('DB Error')
        }

    } else {
        res.status(400).json({
            "msg": "you have to add data"
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body)
        res.json(updatedUser)
    } catch (error) {
        res.status(404).json({
            "msg": "Not found"
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        if (deletedUser != null) return reses.status(404).json(
            {
                "msg": "Not found"
            })
            res.json(deletedUser)
    } catch (error) {
        reses.status(404).json(
            {
                "msg": "Not found"
            })
    }
})

module.exports = router

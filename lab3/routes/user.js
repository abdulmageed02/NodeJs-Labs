const express = require('express')
const userModel = require('../models/user')
const router = express.Router()

router.get("/", (req, res) => {
    userModel.find({}, (error, result) => {
        if (!error) return res.json(result)
    })
})

router.get("/:id", (req, res) => {
    const usr = userModel.findById(req.params.id, (error, result) => {
        if (!error) return res.json(result)
        res.status(404).json({
            "msg": "not found"
        })
    })
})

router.post("/", (req, res) => {
    if (req.body.fName) {
        let user = new userModel({
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            dob: new Date()
        })

        user.save((error, result) => {
            if (!error) return res.json(result)
            res.status(400).send('DB Error')
        })
        
    } else {
        res.status(400).json({
            "msg": "you have to add data"
        })
    }
})

router.put("/:id", (req, res) => {
    userModel.findByIdAndUpdate(req.params.id, req.body, (error, result)=>{
        if (!error) return res.json(result)
        res.status(404).json({
            "msg": "Not found"
        })
    })
})

router.delete("/:id", (req, res) => {
    userModel.findByIdAndDelete(req.params.id, (error, result) => {
        if(result == null || error) return res.status(404).json(
            {
                "msg": "Not found"        
            }
        )
        res.json(result)
        
    })
})

module.exports = router

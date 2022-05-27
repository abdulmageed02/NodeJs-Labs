const express = require('express')
const postModel = require('../models/post')
const router = express.Router()

router.get("/", (req, res) => {
    postModel.find({}).populate('pub').exec((error, result) => {
        if (!error) return res.json(result)
    })
})

router.get("/:id", (req, res) => {
    const usr = postModel.findById(req.params.id).populate('pub').exec((error, result) => {
        if (!error) return res.json(result)
        res.status(404).json({
            "msg": "not found"
        })
    })
})

router.post("/", (req, res) => {
    if (req.body.title) {
        let post = new postModel({
            title: req.body.title,
            body: req.body.body,
            pub: req.body.pub,
        })

        post.save((error, result) => {
            if (!error) return res.json(result)
            console.log(error);
            res.status(400).send('DB Error')
        })
        
    } else {
        res.status(400).json({
            "msg": "you have to add data"
        })
    }
})

router.put("/:id", (req, res) => {
    postModel.findByIdAndUpdate(req.params.id, req.body, (error, result)=>{
        if (!error) return res.json(result)
        res.status(404).json({
            "msg": "Not found"
        })
    })
})

router.delete("/:id", (req, res) => {
    postModel.findByIdAndDelete(req.params.id, (error, result) => {
        if(result == null || error) return res.status(404).json(
            {
                "msg": "Not found"        
            }
        )
        res.json(result)
        
    })
})

module.exports = router

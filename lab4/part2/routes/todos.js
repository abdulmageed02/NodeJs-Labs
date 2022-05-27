const express = require('express')
const usrHelper = require('../helpers/users_helper')
const router = express.Router()

router.get("/", async (req, res) => {
    res.json(await usrHelper.list(req.body, req.query))
})


router.post("/", async (req, res) => {
    if (req.body.title || req.body.body){
        await usrHelper.add(req.body)
        res.json({
            "msg": "added"
        })
    } else {
        res.status(400).json({
            "msg": "you have to add data"
        })
    }
})

router.put("/:id", async (req, res) => {
    await usrHelper.edit(req.params.id, req.body)
    res.json({
        "msg": "edited"
    })
})

router.delete("/:id", async (req, res) => {
    if(await usrHelper.todo(req.params.id).length){
        await usrHelper.remove(req.params.id)
        res.json({
            "msg": "deleted"
        })
    } else {
        res.status(404).json({
            "msg": "not found"
        })
    }
})

router.get("/:id", async (req, res) => {
    if(await usrHelper.todo(req.params.id).length){
        res.json(await usrHelper.todo(req.params.id))
    } else {
        res.status(404).json({
            "msg": "not found"
        })
    }
})

router.put("/check/:id", async (req, res) => {
    await usrHelper.check(req.params.id)
    res.json({
        "msg": "checked"
    })
})

router.put("/uncheck/:id", async (req, res) => {
    await usrHelper.uncheck(req.params.id)
    res.json({
        "msg": "unchecked"
    })
})

module.exports = router

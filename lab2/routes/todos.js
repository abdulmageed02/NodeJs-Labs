const express = require('express')
const usrHelper = require('../helpers/users_helper')
const router = express.Router()

router.get("/", (req, res) => {
    res.json(usrHelper.list(req.body))
})

router.post("/", (req, res) => {
    console.log(req.body);
    res.json(usrHelper.list(req.body))
})

router.post("/add", (req, res) => {
    usrHelper.add(req.body)
    res.json({
        "msg": "added"
    })
})

router.put("/:id", (req, res) => {
    usrHelper.edit(req.params.id, req.body)
    res.json({
        "msg": "edited"
    })
})

router.delete("/:id", (req, res) => {
    usrHelper.remove(req.params.id)
    res.json({
        "msg": "deleted"
    })
})

router.get("/:id", (req, res) => {
    res.json(usrHelper.todo(req.params.id))
})

router.post("/check/:id", (req, res) => {
    usrHelper.check(req.params.id)
    res.json({
        "msg": "checked"
    })
})

router.post("/uncheck/:id", (req, res) => {
    usrHelper.uncheck(req.params.id)
    res.json({
        "msg": "unchecked"
    })
})

module.exports = router

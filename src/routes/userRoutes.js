import userController from "../controllers/userController"

const express = require("express")
const router = express.Router()

// router.get("/", (req, res) => {
// 	res.send({success:"true"});
// })

router.post("/", userController.registerUser)

// router.put("/", (req, res) => {
//         res.send({success:"true"});
// })

// router.delete("/", (req, res) => {
//         res.send({success:"true"});
// })

module.exports = router

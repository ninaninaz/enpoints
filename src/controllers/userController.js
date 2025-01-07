const User = require("../models/User")

const userController = {
    registerUser: async (req, res) => {
        const { username, password } = req.body

        try {
            const newUser = new User({ username, password })
            const user = await newUser.save()
            res.status(201).json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Serverfel")
        }
    },
    loginUser: async (req, res) => {
        try {
            const found = await User.findOne(req.body).exec()

            if (found) {
                res.send(200)
            } else {
                res.status(401).json("Ogiltiga uppgifter")
            }
        } catch {
            res.status(400).json("Dålig input")
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await User.find({})
            res.send(users)
        } catch {
            res.status(500).json("Serverfel")
        }
    },
    delete: async (req, res) => {
        const deleted = await User.findOneAndDelete({ _id: req.body.id })
        deleted
            ? res.send(`Tog bort användare: ${deleted}`)
            : res.status(400).json("Misslyckades att ta bort")
    }
}

module.exports = userController

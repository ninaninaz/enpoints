const User = require("../models/User")
const bcrypt = require("bcryptjs")

const userController = {
    registerUser: async (req, res) => {
        const { username, password } = req.body

        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new User({ username, password: hashedPassword })
            const user = await newUser.save()

            res.status(201).json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Serverfel")
        }
    },
    loginUser: async (req, res) => {
        const { username, password } = req.body

        try {
            const matchedUsername = await User.findOne({ username: username }).exec()

            if (matchedUsername) {
                const matchedPassword = bcrypt.compareSync(password, matchedUsername.password)
                if (matchedPassword) {
                    res.send(200)
                } else {
                    res.status(401).json("Fel lösenord")
                }
            } else {
                res.status(401).json("Fel användarnamn")
            }
        } catch (error) {
            res.status(400).json(error)
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
        const { id } = req.body
        const deleted = await User.findOneAndDelete({ _id: id })
        deleted
            ? res.send(`Tog bort användare: ${deleted}`)
            : res.status(400).json("Misslyckades att ta bort")
    }
}

module.exports = userController

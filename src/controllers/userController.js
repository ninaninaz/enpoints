const User = require("../models/User")
const bcrypt = require("bcryptjs")

const userController = {
    registerUser: async (req, res) => {
        const { username, password } = req.body

        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new User({ username, password: hashedPassword, role: 'user' })
            const user = await newUser.save()

            res.status(201).json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Serverfel")
        }
    },
    loginUser: async (username, password) => {
        try {
            const matchedUsername = await User.findOne({ username: username }).exec();
    
            if (!matchedUsername) {
                return { status: 401, message: "Fel användarnamn" };
            }
    
            const matchedPassword = bcrypt.compareSync(password, matchedUsername.password);
            if (!matchedPassword) {
                return { status: 401, message: "Fel lösenord" };
            }
    
            return { status: 200, user: matchedUsername };
        } catch (error) {
            return { status: 400, message: "Ett fel uppstod", error };
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
    getUser: async (req, res) => {
        const user_id = req.params.id
        try {
            const user = await User.findById(user_id)
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            res.status(200).json(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server error")
        }
    },
    putUser: async (req, res) => {
        const user_id = req.params.id
        const { username, password } = req.body
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const updatedUser = await User.findByIdAndUpdate(
                user_id,
                { username, password: hashedPassword },
                { new: true }
            )
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" })
            }

            res.status(200).json(updatedUser)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server error")
        }
    },
    delete: async (req, res) => {
        //const { id } = req.body
        const id = req.params.id
        const deleted = await User.findOneAndDelete({ _id: id })
        deleted
            ? res.send(`Tog bort användare: ${deleted}`)
            : res.status(400).json("Misslyckades att ta bort")
    }
}

module.exports = userController

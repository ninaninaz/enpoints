const userController = require("../controllers/userController")
const jwt = require('jsonwebtoken')
const verifyToken = require ('../middleware/authMiddleware');

const express = require("express")
const router = express.Router()

router.post("/register", userController.registerUser)
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const authResult = await userController.loginUser(username, password)

    if (authResult.status === 200) {

        const accessToken = jwt.sign(
            { id: authResult.user.id, name: username, role: authResult.user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        
        const refreshToken = jwt.sign(
            { id: authResult.user.id, name: username, role: authResult.user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        })

        res.status(200).json({ message: 'Login successful'})
    } else {
        res.status(authResult.status).json({ message: authResult.message })
    }
})

router.get('/protected', verifyToken, (req, res) => {
    res.send('Welcome to the protected area!');
});
module.exports = router

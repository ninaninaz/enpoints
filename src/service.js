require("dotenv").config()
const app = require('./app.js');
const path = require('path');
const connectDB = require("./config/db")

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => {
	console.log(`http server listening on port: ${PORT}`)
});

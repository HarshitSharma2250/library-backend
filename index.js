const express = require("express");
const server = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

dotenv.config();
const database = require("./config/user.connect");
const userRoutes = require("./routes/user.routes");
const libraryRoutes = require("./routes/library.routes");

const PORT = process.env.PORT || 8080;

// Middleware
server.use(express.json());
server.use(cors({
    origin:"http://127.0.0.1:5173"
})); 

server.use(morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

// Routes
server.use("/user", userRoutes);
server.use("/library", libraryRoutes);

// Root route
server.get('/', (req, res) => {
    res.send(`Welcome to Harshit's library`);
});


// Start server
server.listen(PORT, async () => {
    try {
        await database;
        console.log(`Server is running at port ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
});
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
server.use(cors()); // Ensure CORS middleware is used before routes
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

// Routes
server.use("/user", userRoutes);
server.use("/library", libraryRoutes);

// Root route
server.get('/', (req, res) => {
    res.send(`Welcome to Harshit's library`);
});

// Token generation route
server.post("/token", async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(400).send(`Invalid token`);
    }

    jwt.verify(refreshToken, 'masaischool', function (err, decoded) {
        if (err) {
            return res.status(401).send(`Error verifying refresh token`);
        }

        if (decoded) {
            const accessToken = jwt.sign(
                { name: decoded.name, myId: decoded.myId, role: decoded.role },
                'masai',
                { expiresIn: '10m' }
            );
            return res.status(200).send({ "message": `Token successfully generated`, "accessToken": accessToken });
        } else {
            return res.status(401).send(`Please login again`);
        }
    });
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
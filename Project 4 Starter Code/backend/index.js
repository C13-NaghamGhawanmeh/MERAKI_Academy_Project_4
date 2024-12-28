const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./models/db")
app.use(cors());
app.use(express.json());

const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const postsRouter = require("./routes/posts");
app.use("/users",usersRouter)
app.use("/roles",rolesRouter)
app.use("/posts",postsRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

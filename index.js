const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const searchRoutes = require("./routes/search");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

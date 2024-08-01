const express = require("express");
const app = express();

const connectToMongoDB = require("./config/db");

// Accept incoming request
app.use(express.json({ extended: false }));

// Connect to MongoDB
connectToMongoDB();
// Run the server
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/petBuy",require("./routes/api/petBuy"))




app.listen(3000, () => console.log(`Server running in 3000`));

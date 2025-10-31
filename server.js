const express = require("express");
const cors = require("cors");
require("dotenv").config();

const companyRoutes = require("./routes/company");
const branchRoutes = require("./routes/branch");
const userRoutes = require("./routes/user");
const fundRoutes = require("./routes/fund");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/company", companyRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/user", userRoutes);
app.use("/api/fund", fundRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const path = require("path");
const routeIndex = require("./routes/productsRoutes");
const port = 3000;
// const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routeIndex);

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
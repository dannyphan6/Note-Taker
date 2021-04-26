const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// Allows you to use all files in the "public" directory
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));

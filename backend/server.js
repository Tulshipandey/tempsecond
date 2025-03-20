const app = require("./src/app");
const http = require("http");
const config = require("./src/config/config")

const server = http.createServer(app);

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});


const http = require("http");
const { app } = require("./app");
const port = process.env.PORT || 3000;
const { initializeSocket } = require("./socket");
const server = http.createServer(app);

initializeSocket(server);

app.get("/socket", (req, res) => {
  res.send("Socket server is running!");
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

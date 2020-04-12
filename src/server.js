const app = require("./app");

const port = "3333";

app.listen(port, () => {
  console.log("O servidor está rodando na porta:", port);
});

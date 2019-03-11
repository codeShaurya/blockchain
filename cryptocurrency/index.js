const express = require("express");
const bodyParser = require("body-parser");

const { Block, generateNextBlock, getBlockchain } = require("./src/blockchain");

const httpPort = 3000;
const p2pPort = 6000;

const initHttpServer = httpPort => {
  const app = express();
  app.use(bodyParser.json());

  app.get("/", (req, res) => res.send("Block Chain is here!"));

  app.get("/blocks", (req, res) => {
    res.send(getBlockchain());
  });

  app.post("/mineBlock", (req, res) => {
    const newBlock = generateNextBlock(req.body.data);
    res.send(newBlock);
  });

  app.listen(httpPort, () =>
    console.log(`Example app listening on port ${httpPort}!`)
  );
};

initHttpServer(httpPort);

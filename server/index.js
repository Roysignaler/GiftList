const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
/*
const niceList = require('../utils/niceList.json');
const merkleTree = new MerkleTree(niceList);
console.log(`Root: ${merkleTree.getRoot()}`);
console.log(`Leaves: ${niceList.length}`);
console.log(`Layers: ${Math.ceil(Math.log2(niceList.length))}`);
process.exit();*/

const MERKLE_ROOT = '196b20eb8d22d9e4c2f14e05a4c975ed4150c219ea7ae289d3d632fc576ce5a3';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = body.name;
  const proof = body.proof;
  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

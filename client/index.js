const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {

  const merk = new MerkleTree(niceList);
  const name = process.argv[2]; // insert name as argument. Make sure to use ""
  const index = niceList.findIndex(n => n === name);
  const proof = merk.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    "name": name,
    "proof": proof
  });

  console.log({ gift });
}

main();

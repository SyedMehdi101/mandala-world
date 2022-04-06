import * as fs from "fs";
import { ethers } from "hardhat";
import { calcEthereumTransactionParams } from "@acala-network/eth-providers";
require('dotenv').config();

const txFeePerGas = '199999946752';
const storageByteDeposit = '100000000000000';

async function main() {
  const signers = await ethers.getSigners();
  const blockNumber = await ethers.provider.getBlockNumber();
  const signerIdx = parseInt(process.env.SIGNER || '0');
  const ethParams = calcEthereumTransactionParams({
    gasLimit: '6100001',
    validUntil: (blockNumber + 100).toString(),
    storageLimit: '64001',
    txFeePerGas,
    storageByteDeposit
  });

  const defaultGasParams = {
    gasPrice: ethParams.txGasPrice,
    gasLimit: ethParams.txGasLimit,
  }

  const HelloWorld = await ethers.getContractFactory('HelloWorld');

  const helloWorldContract = await HelloWorld.connect(signers[signerIdx]).deploy(defaultGasParams);
  await helloWorldContract.deployed();

  console.log(`HelloWorld: ${helloWorldContract.address}`);
  const message = await HelloWorld.attach(helloWorldContract.address).connect(signers[signerIdx]).message();
  console.log(`Message: ${message}`);

  const fileName = `deployed-${process.env.DEPLOY_ON}.json`;
  const fileData = {};
  if (fs.existsSync(fileName)) {
    Object.assign(fileData, JSON.parse(fs.readFileSync(fileName, 'utf8')))
  }
  Object.assign(fileData, { [signerIdx]: helloWorldContract.address });
  fs.writeFileSync(fileName, JSON.stringify(fileData));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

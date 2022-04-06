import * as fs from "fs";
import { ethers } from "hardhat";
require('dotenv').config();

async function main() {
    const signerIdx = parseInt(process.env.SIGNER || '0');
    const deploymentIdx = parseInt(process.env.DEPLOYMENT || '0');

    const fileName = `deployed-${process.env.DEPLOY_ON}.json`;
    const fileData = {} as { [key: number]: string };
    let address = ''
    if (fs.existsSync(fileName)) {
        Object.assign(fileData, JSON.parse(fs.readFileSync(fileName, 'utf8')))
    } else {
        throw new Error(`deployed file not found ${fileName}`);
    }
    if (fileData[deploymentIdx]) {
        address = fileData[deploymentIdx];
    } else {
        throw new Error(`deployment ${deploymentIdx} not found in ${fileName}`);
    }

    const signers = await ethers.getSigners();
    console.log(`Fetching greeting message from contract ${address} using signer ${signerIdx}`);

    const HelloWorld = await ethers.getContractFactory('HelloWorld');

    const message = await HelloWorld.attach(address).connect(signers[signerIdx]).message();
    console.log(`Message: ${message}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

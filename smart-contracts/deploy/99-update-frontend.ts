import * as fs from "fs";
import * as path from "path";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment, Network } from "hardhat/types";
import { PasswordManager__factory } from "../typechain-types";
import { FormatTypes } from "ethers/lib/utils";

require("dotenv").config();

const FRONTEND_ADDRESSES_FILE: string = path.join(
  __dirname,
  process.env.FRONTEND_ADDRESSES_FILE || ""
);
const FRONTEND_ABI_LOCATION: string = path.join(__dirname, process.env.FRONTEND_ABI_LOCATION || "");
const FRONTEND_CONTRACT_TYPE_LOCATION: string = path.join(
  __dirname,
  process.env.FRONTEND_CONTRACT_TYPE_LOCATION || ""
);
const SHOULD_UPDATE_FRONTEND = process.env.SHOULD_UPDATE_FRONTEND || false;

const typeScriptDir: string = path.join(__dirname, "../typechain-types/contracts" || "");
const contractName = "PasswordManager";

const updateFrontEndDetails: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { ethers, network } = hre;
  if (SHOULD_UPDATE_FRONTEND) {
    console.log("Updating frontend...");
    await updateContractAddresses(ethers, network);
    await updateAbi(ethers, network);
    await copyTypes(
      typeScriptDir,
      path.join(FRONTEND_CONTRACT_TYPE_LOCATION, "contracts"),
      "PasswordManager.ts"
    );
    await copyTypes(
      path.join(__dirname, "../typechain-types/"),
      FRONTEND_CONTRACT_TYPE_LOCATION,
      "common.ts"
    );
  }
};

const updateContractAddresses = async (ethers: any, network: Network) => {
  const passwordManagerContractFactory = (await ethers.getContractFactory(
    contractName
  )) as PasswordManager__factory;
  const passwordManager = await passwordManagerContractFactory.deploy();
  const chainId = network.config.chainId.toString();

  if (!fs.existsSync(FRONTEND_ADDRESSES_FILE)) {
    console.log(`Creating file ${FRONTEND_ADDRESSES_FILE}`);
    ensureDirectoryExistence(FRONTEND_ADDRESSES_FILE);
    // fs.closeSync(fs.openSync(FRONTEND_ADDRESSES_FILE, "w"));
    fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify({}));
  }

  console.log(`Reading file ${FRONTEND_ADDRESSES_FILE}`);
  let currentAddresses = JSON.parse(fs.readFileSync(FRONTEND_ADDRESSES_FILE, { encoding: "utf8" }));

  if (!currentAddresses[contractName]) {
    currentAddresses = { [contractName]: {} };
  }
  if (chainId in currentAddresses[contractName]) {
    currentAddresses[contractName][chainId] = passwordManager.address;
    // if (!currentAddresses[contractName][chainId].includes(passwordManager.address)) {
    //   currentAddresses[chainId][contractName].push(passwordManager.address);
    // }
  } else {
    currentAddresses[contractName] = {
      ...currentAddresses[contractName],
      [chainId]: passwordManager.address,
    };
  }
  fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(currentAddresses));

  console.log("Contract Address file created ");
};

const updateAbi = async (ethers: any, network: Network) => {
  const passwordManagerContractFactory = (await ethers.getContractFactory(
    contractName
  )) as PasswordManager__factory;
  const passwordManager = await passwordManagerContractFactory.deploy();

  const filePath = path.join(FRONTEND_ABI_LOCATION, `${contractName}.json`);
  ensureDirectoryExistence(filePath);

  if (!fs.existsSync(filePath)) {
    console.log(`Creating file ${filePath}`);
    fs.writeFileSync(filePath, JSON.stringify({}));
  }

  fs.writeFileSync(filePath, passwordManager.interface.format(FormatTypes.json).toString());
  console.log("Contract ABI file created");
};

const copyTypes = (fromBaseDir: string, toBaseDir: string, fileName: string) => {
  const fromFilePath = path.join(fromBaseDir, fileName);
  const toFilePath = path.join(toBaseDir, fileName);
  ensureDirectoryExistence(toFilePath);
  fs.copyFileSync(fromFilePath, toFilePath);
  console.log("File Copied");
};

const ensureDirectoryExistence = (filePath: string) => {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  console.log(`Creating Dir : ${dirname}`);
  fs.mkdirSync(dirname);
};

export default updateFrontEndDetails;
updateFrontEndDetails.tags = ["all", "frontend"];

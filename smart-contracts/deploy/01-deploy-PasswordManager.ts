// import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

require("dotenv").config();

const deployFn: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy } = deployments;
  const { deployer, nftTokenUser } = await getNamedAccounts();
  // console.log("deployer=========================", deployer);
  // console.log("nftTokenUser=========================", nftTokenUser);
  // console.log("nftTokenUser=========================", network.config.chainId);
  // console.log("nftTokenUser=========================", networkConfig[network.config.chainId]);

  console.log("-----------------------------------------");
  const args: any = [];

  console.log("Deploying ..... ");
  const passwordManagerNFT = await deploy("PasswordManager", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[network.config.chainId].blockConfirmations || 1,
  });
  console.log(
    `Deployed .....\nTxn(${passwordManagerNFT.transactionHash})\nContract Address(${passwordManagerNFT.address}) `
  );

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying ..... ");
    await verify(passwordManagerNFT.address, args);
  }
  console.log("-----------------------------------------");
};

export default deployFn;
deployFn.tags = ["all", "PasswordManager", "main"];

import { run } from "hardhat";

const verify = async (contractAddress: string, args: any) => {
  console.log("Verifying contract... : ", contractAddress);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
    console.log("Verifying contract failed...", JSON.stringify(error));
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(error);
    }
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { verify, sleep };

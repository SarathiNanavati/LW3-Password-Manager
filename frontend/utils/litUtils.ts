import LitJsSdk from "@lit-protocol/sdk-browser";
import { config } from "../config/config";
import { blobToDataURI, dataURItoBlob } from "./utils";

const litClient = new LitJsSdk.LitNodeClient();

export const getAccessControlConditions = (
  tokenId: number,
  address: string,
  chain: string,
  contractAddress: string
) => {
  const updatedChain = chain === "maticmum" ? "mumbai" : chain;

  const accessControl = config.application.litAccessControlConditions;
  accessControl[0].contractAddress = contractAddress;
  accessControl[0].chain = updatedChain;

  accessControl[2].contractAddress = contractAddress;
  accessControl[2].chain = updatedChain;
  accessControl[2].parameters = [tokenId.toString()];
  accessControl[2].returnValueTest.value = address;

  accessControl[4].chain = updatedChain;

  return accessControl;
};

export const connectToLitNetwork = async (): Promise<void> => {
  return new Promise((resolve) => {
    const listener = () => {
      console.log("LIT network is ready");
      document.removeEventListener("lit-ready", listener);
      resolve();
    };
    litClient.connect();
    document.addEventListener("lit-ready", listener);
  });
};

export const encryptString = async (
  data: string,
  accessControlConditions: any,
  chain: string
): Promise<{ status: boolean; encryptedString?: any; encryptedSymmetricKey?: any }> => {
  const updatedChain = chain === "maticmum" ? "mumbai" : chain;

  try {
    await connectToLitNetwork();
    let authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: updatedChain,
    });
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(data);

    let encryptedSymmetricKey = await litClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain: updatedChain,
    });

    return {
      status: true,
      encryptedString: await blobToDataURI(encryptedString),
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
    };
  } catch (error) {
    console.error(error);
    return { status: false };
  }
};

export const decryptString = async (
  storedEncryptedString: string,
  encryptedSymmetricKey: string,
  accessControlConditions: any,
  chain: string
) => {
  const updatedChain = chain === "maticmum" ? "mumbai" : chain;

  try {
    await connectToLitNetwork();
    let authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: updatedChain,
    });

    const symmetricKey = await litClient.getEncryptionKey({
      toDecrypt: encryptedSymmetricKey,
      accessControlConditions,
      authSig,
      chain: updatedChain,
    });

    const decryptedString = await LitJsSdk.decryptString(
      dataURItoBlob(storedEncryptedString),
      symmetricKey
    );

    return { status: true, decryptedString };
  } catch (error) {
    console.error(error);
    return { status: false };
  }
};

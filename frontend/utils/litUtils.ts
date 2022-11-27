import LitJsSdk from "@lit-protocol/sdk-browser";
import { config } from "../config/config";
import { blobToDataURI, dataURItoBlob } from "./utils";

const litClient = new LitJsSdk.LitNodeClient();

export const getAccessControlConditions = (tokenId: number, address: string) => {
  const accessControl = config.application.litAccessControlConditions;
  accessControl[2].parameters = [tokenId.toString()];
  accessControl[2].returnValueTest.value = address;
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
  await connectToLitNetwork();

  try {
    let authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain,
    });

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(data);

    let encryptedSymmetricKey = await litClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
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
  console.log(encryptedSymmetricKey, accessControlConditions);

  await connectToLitNetwork();

  try {
    let authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain,
    });

    const symmetricKey = await litClient.getEncryptionKey({
      toDecrypt: encryptedSymmetricKey,
      accessControlConditions,
      authSig,
      chain,
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

import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import { getResolver as getKeyResolver } from "key-did-resolver";
import { getResolver as get3IDResolver } from "@ceramicnetwork/3id-did-resolver";
import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { APIKEYNAME, config } from "../config/config";
import { TileDocument } from "@ceramicnetwork/stream-tile";

const ceramicClient = new CeramicClient(config.client[APIKEYNAME.CERAMIC_API_URL]);

export type CeramicStoreObjectType = {
  accessControlConditions: any;
  accessControlConditionType: string;
  chain: string;
  encryptedString: any;
  encryptedSymmetricKey: any;
};

const authenticateWithEthereum = async (ethereumProvider: any, address: string): Promise<void> => {
  const authProvider = new EthereumAuthProvider(ethereumProvider, address);
  const threeID = new ThreeIdConnect();
  await threeID.connect(authProvider);

  const did = new DID({
    provider: threeID.getDidProvider(),
    resolver: {
      ...get3IDResolver(ceramicClient),
      ...getKeyResolver(),
    },
  });

  await did.authenticate();

  ceramicClient.did = did;
};

export const authenticateCeramicClient = async (address: string): Promise<void> => {
  if (window.ethereum == null) {
    throw new Error("No injected Ethereum provider");
  }
  await authenticateWithEthereum(window.ethereum, address);
};

export const loadDocument = async (streamId: string): Promise<CeramicStoreObjectType> => {
  const doc = await TileDocument.load(ceramicClient, streamId);
  return doc.content as CeramicStoreObjectType;
};

export const createDocument = async (data: CeramicStoreObjectType): Promise<string> => {
  const doc: TileDocument = await TileDocument.create(ceramicClient, data, {
    family: "LW3 Password Vault",
    controllers: [ceramicClient.did!.id],
  });
  return doc.id.toString();
};

export const updateDocument = async (
  streamId: string,
  data: CeramicStoreObjectType
): Promise<string> => {
  const doc = await TileDocument.load(ceramicClient, streamId);
  await doc.update(data);
  return doc.id.toString();
};

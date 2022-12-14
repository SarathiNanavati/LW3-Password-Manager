import { APIKEYNAME, config } from "../config/config";
import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import { NFTMetaDataType } from "./utils";

const pinataCloudPinningBaseURL = `https://api.pinata.cloud/pinning/`;
const pinataKey = config.client[APIKEYNAME.PINATA_API_KEY];
const pinataSecret = config.client[APIKEYNAME.PINATA_API_SECRET];

const metadata = {
  name: "",
};
const options = {
  cidVersion: 1,
};

const pinataApiCall = async (data: FormData | string): Promise<AxiosResponse | null> => {
  const pinataURL =
    typeof data === "string"
      ? `${pinataCloudPinningBaseURL}pinJSONToIPFS`
      : `${pinataCloudPinningBaseURL}pinFileToIPFS`;

  try {
    const res = await axios.post(pinataURL, data, {
      headers: {
        "Content-Type": typeof data === "string" ? `application/json` : `multipart/form-data; `,
        pinata_api_key: pinataKey,
        pinata_secret_api_key: pinataSecret,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const pinFileToIPFS = async (
  file: File,
  fileName: string
): Promise<{ ipfsHashUrl: string; status: boolean }> => {
  let formData: FormData = new FormData();
  metadata.name = fileName;

  formData.append("file", file);
  formData.append("pinataMetadata", JSON.stringify(metadata));
  formData.append("pinataOptions", JSON.stringify(options));

  const res = await pinataApiCall(formData);

  if (res) {
    return { ipfsHashUrl: `ipfs://${res.data.IpfsHash}`, status: true };
  } else {
    return { ipfsHashUrl: "", status: false };
  }
};

export const pinMetaDataToIPFS = async (
  nftMetadata: NFTMetaDataType,
  fileName: string
): Promise<{ ipfsHashUrl: string; status: boolean }> => {
  metadata.name = fileName;

  const data = JSON.stringify({
    pinataOptions: options,
    pinataMetadata: metadata,
    pinataContent: nftMetadata,
  });

  const res = await pinataApiCall(data);

  if (res) {
    return { ipfsHashUrl: `ipfs://${res.data.IpfsHash}`, status: true };
  } else {
    return { ipfsHashUrl: "", status: false };
  }
};

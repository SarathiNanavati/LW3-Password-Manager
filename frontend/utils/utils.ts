export type AttributeType = {
  trait_type: string;
  value: string | string[];
};

export type NFTMetaDataType = {
  name: string;
  description: string;
  image: string;
  attributes?: AttributeType[];
};

export const createMetaDataJson = (url: string): NFTMetaDataType => {
  let nftMetaData: NFTMetaDataType = {
    name: "Password Vault Access Token",
    description: "You have access to De-Centralized Password Vault Application",
    image: url,
  };

  nftMetaData.attributes = [];
  nftMetaData.attributes.push({ trait_type: "community_name", value: "LearnWeb3" });
  nftMetaData.attributes.push({ trait_type: "application_name", value: "Password Vault" });

  return nftMetaData;
};

export const dataURLtoFile = (dataurl: string, filename: string): File => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

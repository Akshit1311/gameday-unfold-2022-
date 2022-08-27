const { Web3Storage, File } = require("web3.storage");

// eslint-disable-next-line turbo/no-undeclared-env-vars
const token = process.env.WEB3_STORAGE_TOKEN;

const client = new Web3Storage({ token });

const uploadToIpfs = async (data) => {
  try {
    const result = JSON.stringify(data);

    const file = new File([result], "result.json", { type: "text/plain" });
    const cid = await client.put([file]);

    console.log({ cid });

    return cid;
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { uploadToIpfs };

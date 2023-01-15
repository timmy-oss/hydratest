import NodeRSA from "node-rsa";
import { RpcRequest } from "./rpc";

export function encryptRsa(message, keyString) {
  const key = new NodeRSA().importKey(keyString, "pkcs1-public-pem");
  return key.encrypt(message, "hex");
}

export function decryptRsa(ciphertext, keyString) {
  const key = new NodeRSA().importKey(keyString, "pkcs1-private-pem");

  return key.decrypt(Buffer.from(ciphertext, "hex"), "utf-8");
}

function createKeys() {
  const key = new NodeRSA({ b: 512 });

  const publicKey = key.exportKey("pkcs1-public-pem");
  const privateKey = key.exportKey("pkcs1-private-pem");

  return {
    publicKey,
    privateKey,
  };
}

export async function createSession(examId, token) {
  const key = createKeys();

  const body = {
    req: {
      auth: {
        token,
      },
      body: {
        exam: examId,
        key: key.publicKey,
      },
    },
  };

  const res = await RpcRequest("exams.create_session", body);

  return {
    key,
    res,
  };
}
